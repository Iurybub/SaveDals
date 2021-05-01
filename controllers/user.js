const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");
const letter_id = require("letter-id");

exports.getHome = (req, res, next) => {
  res.render("user/home", {
    pageTitle: "Home Dals",
    isAuth: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
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
    .catch((err) => console.log);
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
    .catch((err) => res.redirect("/"));
};

exports.postQuestion = (req, res, next) => {
  let id_gen = letter_id.generateCustomLetterId(1, 10).toString();
  const special_id = id_gen;
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

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
      console.log(err);
    });
};

exports.postRequest = (req, res, next) => {
  console.log(req.files + "test");
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const animal = req.body.animal;
  const paperwork = req.files[0];
  const paperworkUrl = paperwork.path;
  const request = new Request({
    first_name: first_name,
    last_name: last_name,
    email: email,
    animal: animal,
    paperworkUrl: paperworkUrl,
  });

  Request.findOne({ _id: animal })
    .populate("animal")
    .exec()
    .then(() => {
      request
        .save()
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
