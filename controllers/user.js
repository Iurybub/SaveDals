const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");

exports.getHome = (req, res, next) => {
  res.render("user/home", {
    pageTitle: "Home Dals",
    isAuth: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
  });
};

exports.getAnimals = (req, res, next) => {
  res.render("user/animals", {
    pageTitle: "All Animals",
    isAuth: req.session.isLoggedIn,
  });
};
exports.getAnimalDetails = (req, res, next) => {
  const animalId = req.params.id;
  Animal.findById(animalId)
    .then((animal) => {
      res.render("user/animals", {
        pageTitle: "All Animals",
        animal: animal,
        isAuth: req.session.isLoggedIn,
      });
    })
    .catch((err) => res.redirect("/"));
};

// User POST methods

exports.postQuestion = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const question = new Question({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
  question
    .save()
    .then(() => {
      res.redirect("/question-succses");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postRequest = (req, res, next) => {
  const first_name = req.body.name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const animal = req.body.animal;
  const paperwork = req.body.paperwork;

  const question = new Question({
    first_name: first_name,
    last_name: last_name,
    email: email,
    subject: subject,
    message: message,
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
