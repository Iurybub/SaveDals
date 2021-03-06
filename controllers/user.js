const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");
const letter_id = require("letter-id");
const { validationResult } = require("express-validator");

exports.getHome = (req, res, next) => {
  res.render("user/home", {
    pageTitle: "Home Dals",
    isAuth: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
    errorMessage: [],
    oldInput: {},
  });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .sort("-created_at")
    .then((animals) => {
      res.render("user/animals", {
        pageTitle: "Animals - All",
        animals: animals,
        isAuth: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getAnimalDetails = (req, res, next) => {
  const animalId = req.params.id;
  Animal.findById(animalId)
    .then((animal) => {
      res.render("user/details", {
        pageTitle: "All Animals",
        animal: animal,
        csrfToken: req.csrfToken(),
        isAuth: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postQuestion = (req, res, next) => {
  let id_gen = letter_id.generateCustomLetterId(1, 10).toString();
  const special_id = id_gen;
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("user/home", {
      pageTitle: "Home Dals",
      isAuth: req.session.isLoggedIn,
      csrfToken: req.csrfToken(),
      errorMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
        email: email,
        subject: subject,
        message: message,
      },
    });
  }
  const question = new Question({
    name: name,
    email: email,
    subject: subject,
    message: message,
    special_id: special_id,
  });
  question
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postRequest = (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const animal = req.body.animal;
  const paperwork = req.files[0];
  const paperworkUrl = paperwork.path;
  let requestObj;
  const request = new Request({
    first_name: first_name,
    last_name: last_name,
    email: email,
    animal: animal,
    paperworkUrl: paperworkUrl,
  });
  const result = request.save();
  result
    .then(() => {
      Animal.updateOne(
        { _id: animal },
        { $push: { requested_by: request } }
      ).then(() => {
        res.redirect("/animals");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getQuestionaire = (req, res, next) => {
  res.download("uploads/adoption-questionaire.pdf");
};
