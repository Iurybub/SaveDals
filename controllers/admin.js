const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const Animal = require("../models/Animal");

exports.getIndex = (req, res, next) => {
  Animal.find()
    .limit(5)
    .then((animals) => {
      return Blog.count().then((blogCount) => {
        res.render("admin/index", {
          pageTitle: "Dashboard",
          animals: animals,
          blogCount: blogCount,
          path: "/admin",
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => {
      res.render("admin/cms/blogs", {
        pageTitle: "Admin Blogs",
        blogs: blogs,
        path: "/admin/blogs",
      });
    })
    .catch((err) => console.log(err));
};
exports.postBlog = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const content = req.body.content;
  const date = new Date();

  const blog = new Blog({
    title: title,
    imageUrl: imageUrl,
    content: content,
    date: date,
  });
  blog
    .save()
    .then((response) => {
      return res.redirect("blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getBlogDetails = (req, res, next) => {
  res.render("admin/blog-details", {
    pageTitle: "Admin Index Page",
  });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/cms/animals", {
        pageTitle: "Admin Index Page",
        animals: animals,
        path: "/admin/animals",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAnimalDetails = (req, res, next) => {
  res.render("admin/animal-details", {
    pageTitle: "Admin Index Page",
  });
};

exports.getAddBlog = (req, res, next) => {
  res.render("admin/actions/add-blog", {
    pageTitle: "Admin Add Blog",
  });
};

exports.getAddAnimal = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/cms/add-animal", {
        pageTitle: "Admin Add Animal",
        animals: animals,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAnimal = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const age = req.body.age;
  const breed = req.body.breed;
  const height = req.body.height;
  const weight = req.body.weight;
  const color = req.body.color;

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
      return res.redirect("animals");
    })
    .catch((err) => console.log(err));
};
