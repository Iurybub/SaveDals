const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");
const Testimonial = require("../models/testimonial");
const { validationResult } = require("express-validator");
const { deleteFile } = require("../utils/file");
const errorHandler = require("../utils/errorHandler");

exports.getDashboard = (req, res, next) => {
  let animals;
  let questions;
  let requests;
  Animal.find()
    .limit(5)
    .sort("-created_at")
    .then((animal) => {
      animals = animal;
    })
    .then(() => {
      Request.find()
        .populate("animal")
        .limit(5)
        .sort("-created_at")
        .then((request) => {
          requests = request;
        })
        .then(() => {
          Question.find()
            .limit(5)
            .sort("-created_at")
            .then((question) => {
              questions = question;
            })
            .then(() => {
              return res.render("admin/Dashboard", {
                pageTitle: "Admin | Dasboard",
                animals: animals,
                questions: questions,
                requests: requests,
                path: "/",
                pageTitle: "Admin | Dasboard",
                pageAbout: "Dashboard",
                user: req.user,
                csrfToken: req.csrfToken(),
              });
            })
            .catch((err) => {
              const error = new Error(err);
              error.httpStatusCode = 500;
              return next(error);
            });
        });
    });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/animals", {
        animals: animals,
        path: "/category/animals",
        pageTitle: "Admin | Dals",
        pageAbout: "Our Dals",
        user: req.user,
        csrfToken: req.csrfToken(),
        errorMessage: "",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddAnimals = (req, res, next) => {
  Animal.find()
    .limit(5)
    .then((animals) => {
      res.render("admin/Animals/edit", {
        animals: animals,
        editing: false,
        csrfToken: req.csrfToken(),
        user: req.user,
        errorMessage: "",
        animal: {},
        oldInput: {},
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditAnimals = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const ID = req.params.id;
  Animal.findById(ID)
    .then((animal) => {
      res.render("admin/Animals/edit", {
        editting: true,
        csrfToken: req.csrfToken(),
        user: req.user,
        animal: animal,
        editing: editMode,
        oldInput: {},
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postAddAnimal = (req, res, next) => {
  const name = req.body.name;
  const image = req.files[0];
  const age = req.body.age;
  const breed = req.body.breed;
  const description = req.body.description;
  const created_at = new Date();
  const errors = validationResult(req);
  if (!image) {
    return res.redirect("/500");
  }
  const imageUrl = image.path;
  if (!errors.isEmpty()) {
    return res.status(417).render("admin/Animals/edit", {
      editing: false,
      csrfToken: req.csrfToken(),
      user: req.user,
      animal: {},
      errorMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
        breed: breed,
        age: age,
        description: description,
      },
    });
  }

  const animal = new Animal({
    name: name,
    imageUrl: imageUrl,
    description: description,
    age: age,
    breed: breed,
    created_at: created_at,
  });
  animal
    .save()
    .then((result) => {
      res.redirect("/admin");
      req.file = null;
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditAnimal = (req, res, next) => {
  const id = req.body.animalID;
  const name = req.body.name;
  const image = req.files[0];
  const age = req.body.age;
  const breed = req.body.breed;
  const description = req.body.description;
  const created_at = new Date();
  Animal.findById(id)
    .then((animal) => {
      if (image) {
        fileHelper.deleteFile(animal.imageUrl);
        animal.imageUrl = image.path;
      }
      animal.name = name;
      animal.age = age;
      animal.breed = breed;
      animal.description = description;
      animal.created_at = created_at;

      return animal.save().then(() => {
        res.redirect("/admin");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteAnimal = (req, res, next) => {
  const id = req.params.id;
  const animal = Animal.findOneAndDelete({ _id: id });
  let imageUrl;
  animal
    .then((animal) => {
      imageUrl = animal.imageUrl;
      Request.deleteMany({ animal: animal })
        .then(() => {
          deleteFile(imageUrl);
          return res.redirect("/admin");
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getApplication = (req, res, next) => {
  const appId = req.params.id;
  const request = Request.findOne({ _id: appId })
    .then((request) => {
      res.download(
        request.paperworkUrl.toString(),
        `${request.name}-application.pdf`
      );
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
