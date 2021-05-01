const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");
const Testimonial = require("../models/testimonial");
const fileHelper = require("../utils/file");
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
          console.log(requests);
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
      });
    })
    .catch((err) => console.log(err));
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
        animal: {},
      });
    })
    .catch((err) => console.log(err));
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
      });
    })
    .catch((err) => console.log(err));
};
exports.postAddAnimal = (req, res, next) => {
  const name = req.body.name;
  const image = req.files[0];
  const imageUrl = image.path;
  const age = req.body.age;
  const breed = req.body.breed;
  const description = req.body.description;
  const created_at = new Date();
  console.log(req.files[0].path);
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
      console.log("Created Animal");
      res.redirect("/admin");
      req.file = null;
    })
    .catch((err) => console.log(err));
};

exports.postEditAnimal = (req, res, next) => {
  const id = req.body.animalID;
  const name = req.body.name;
  const image = req.files[0];
  const age = req.body.age;
  const breed = req.body.breed;
  const description = req.body.description;
  const created_at = new Date();
  console.log(id);
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
    .catch((err) => console.log(err));
};

exports.postDeleteAnimal = (req, res, next) => {
  const id = req.params.id;
  Animal.findById(id)
    .then((animal) => {
      fileHelper.deleteFile(animal.imageUrl);
      return Animal.deleteOne({ _id: id }).then(() => {
        res.redirect("/admin");
      });
    })
    .catch((err) => console.log(err));
};
