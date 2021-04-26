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

exports.getAdd = (req, res, next) => {
  Animal.find()
    .limit(5)
    .then((animals) => {
      res.render("admin/add-animal", {
        animals: animals,
        path: "/category/animals",
        pageTitle: "Admin | Add Dals",
        pageAbout: "Add New Dals",
        csrfToken: req.csrfToken(),
        user: req.user,
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
      res.render("admin/edit-animal", {
        pageTitle: `Edit ${animal.name}`,
        pageAbout: `Edit ${animal.name}`,
        edit_mode: edit_mode,
        animal: animal,
        path: "/admin/animals/edit",
        user: req.user,
        csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => console.log(err));
};

exports.postAdd = (req, res, next) => {
  const name = req.body.name;
  const image = req.file;
  const imageUrl = image.path;
  const age = req.body.age;
  const breed = req.body.breed;
  const height = req.body.height;
  const weight = req.body.weight;
  const color = req.body.color;
  const description = req.body.description;
  console.log(imageUrl);
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
      res.redirect("/admin/category/animals");
    })
    .catch((err) => console.log(err));
};

exports.postEdit = (req, res, next) => {
  const edit_mode = req.query.edit;
  const id = req.params.id;
  const updated_name = req.body.name;
  const image = req.file;
  const updated_age = req.body.age;
  const updated_breed = req.body.breed;
  const updated_height = req.body.height;
  const updated_weight = req.body.weight;
  const updated_color = req.body.color;
  const updated_description = req.body.description;

  Animal.findById(id)
    .then((animal) => {
      animal.name = updated_name;
      if (imageUrl) {
        animal.imageUrl = image.path;
      }
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
  Animal.findById(id)
    .then((animal) => {
      fileHelper.deleteFile(animal.imageUrl);
      return Animal.deleteOne({ _id: id }).then(() => {
        res.redirect("/admin/category/animals");
      });
    })
    .catch((err) => console.log(err));
};

exports.getQuestions = (req, res, next) => {
  Question.find()
    .then((questions) => {
      res.render("admin/questions", {
        pageTitle: "Admin | Questions",
        questions: questions,
        path: "/",
        pageTitle: "Admin | Questions",
        pageAbout: "Questions",
        user: req.session.user,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPending = (req, res, next) => {
  Request.find()
    .then((questions) => {
      res.render("admin/questions", {
        questions: questions,
        path: "/",
        pageTitle: "Admin | Questions",
        pageAbout: "Pending Adoption & Fostering Requests",
        user: req.session.user,
      });
    })
    .catch((err) => console.log(err));
};

// UI Related Requests

exports.getTestimonials = (req, res, next) => {
  Testimonial.find()
    .then((testimonials) => {
      res.render("admin/testimonials", {
        testimonials: testimonials,
        pageTitle: "Admin | Testimonials",
        pageAbout: "Adopters Testimonials",
        user: req.session.user,
        csrfToken: req.csrfToken(),
        path: "/",
      });
    })
    .catch();
};
exports.getGallery = (req, res, next) => {};
