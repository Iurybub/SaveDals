const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");

exports.getDashboard = (req, res, next) => {
  let animals;
  let questions;
  let requests;
  Animal.find()
    .limit(5)
    .sort({ date: -1 })
    .then((animal) => {
      animals = animal;
    })
    .then(() => {
      Request.find()
        .limit(5)
        .sort({ date: -1 })
        .then((request) => {
          requests = request;
        })
        .then(() => {
          Question.find()
            .limit(5)
            .sort({ date: -1 })
            .then((question) => {
              questions = question;
            })
            .then(() => {
              return res.render("admin/index", {
                pageTitle: "Admin | Dasboard",
                animals: animals,
                questions: questions,
                request: requests,
                path: "/",
                pageAbout: "Dashboard",
              });
            });
        });
    });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/cms/animals", {
        pageTitle: "Admin | All",
        animals: animals,
        path: "/admin/add-animals",
        pageAbout: "All Dals",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddNew = (req, res, next) => {
  Animal.find()
    .limit(5)
    .sort({ date: -1 })
    .then((animals) => {
      res.render("admin/cms/add-animal", {
        pageTitle: "Admin | Add New",
        animals: animals,
        path: "/admin/animals",
        pageAbout: "Add New",
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddNew = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const age = req.body.age;
  const breed = req.body.breed;
  const height = req.body.height;
  const weight = req.body.weight;
  const color = req.body.color;
  const description = req.body.description;

  const animal = new Animal({
    name: name,
    imageUrl: imageUrl,
    description: description,
    age: age,
    breed: breed,
    height: height,
    weight: weight,
    color: color,
  });
  animal
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/animals/add-new");
    })
    .catch((err) => console.log(err));
};
exports.getAnimalDetails = (req, res) => {
  const animalId = req.params.id;
  Animal.findOne({ _id: animalId })
    .then((animal) => {
      res.render("admin/cms/animal-details", {
        animal: animal,
        pageAbout: "Details",
      });
    })
    .catch((err) => console.log(err));
};
