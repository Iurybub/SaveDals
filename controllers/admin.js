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
                requests: requests,
                path: "/",
                pageAbout: "Dashboard",
                user: req.session.user,
              });
            });
        });
    });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/animals/animals", {
        pageTitle: "Admin | All",
        animals: animals,
        path: "/admin/add-animals",
        pageAbout: "All Dals",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAdd = (req, res, next) => {
  Animal.find()
    .limit(5)
    .then((animals) => {
      res.render("admin/animals/add-animal", {
        pageTitle: "Admin | Add New",
        animals: animals,
        path: "/admin/animals",
        pageAbout: "Add New",
        csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => console.log(err));
};

exports.getEdit = (req, res, next) => {
  const edit_mode = req.query.edit;
  if (!edit_mode) {
    return res.redirect("/admin");
  }
  const animal_id = req.params.id;
  Animal.findById(animal_id)
    .then((animal) => {
      if (!animal) {
        return res.redirect("/admin");
      }
      res.render("admin/animals/edit-animal", {
        pageTitle: `Edit ${animal.name}`,
        pageAbout: `Edit ${animal.name}`,
        edit_mode: edit_mode,
        animal: animal,
        path: "/admin/animals/edit",
        csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => console.log(err));
};

exports.postAdd = (req, res, next) => {
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
      res.redirect("/admin/animals");
    })
    .catch((err) => console.log(err));
};

exports.postEdit = (req, res, next) => {
  const edit_mode = req.query.edit;
  const id = req.params.id;
  const updated_name = req.body.name;
  const updated_imageUrl = req.body.imageUrl;
  const updated_age = req.body.age;
  const updated_breed = req.body.breed;
  const updated_height = req.body.height;
  const updated_weight = req.body.weight;
  const updated_color = req.body.color;
  const updated_description = req.body.description;

  Animal.findById(id)
    .then((animal) => {
      animal.name = updated_name;
      animal.imageUrl = updated_imageUrl;
      animal.age = updated_age;
      animal.breed = updated_breed;
      animal.height = updated_height;
      animal.weight = updated_weight;
      animal.color = updated_color;
      animal.description = updated_description;

      return animal.save().then(() => {
        res.redirect("/admin/category/animals");
      });
    })
    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  const id = req.params.id;
  Animal.findByIdAndDelete(id).then((animal) => {
    if (!animal) {
      return res.redirect("/admin/category/animals");
    }
    return animal.deleteOne().then(() => {
      res.redirect("/admin/category/animals");
    });
  });
};

exports.getQuestions = (req, res, next) => {
  Question.find()
    .then((questions) => {
      res.render("admin/questions", {
        pageTitle: "Admin | Questions",
        questions: questions,
        path: "/",
        pageAbout: "Dashboard",
        user: req.session.user,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPending = (req, res, next) => {};
