const Blog = require("../models/Blog");
const Animal = require("../models/Animal");

exports.getIndex = (req, res, next) => {
  res.render("adoption/index", {
    pageTitle: "Save the Dals",
  });
};

exports.getAnimals = (req, res, next) => {
  Animal.find()
    .then((animals) => {
      res.render("admin/animals", {
        pageTitle: "Admin Index Page",
        animals: animals,
      });
    })
    .catch((err) => console.log(err));
};
exports.getAnimalDetails = (req, res, next) => {
  res.render("adoption/animals", {
    pageTitle: "Save the Dals Pets",
  });
};
exports.postAnimalAdoptionRequest = (req, res, next) => {
  console.log(req);
};
exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => {
      res.render("adoption/blogs", {
        pageTitle: "Save the Dals Blog",
        blogs: blogs,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getBlogDetails = (req, res, next) => {
  res.render("adoption/animals", {
    pageTitle: "Save the Dals Pets",
  });
};
exports.getContactRequest = (req, res, next) => {
  res.render("adoption/animals", {
    pageTitle: "Save the Dals Pets",
  });
};
exports.postContactRequest = (req, res, next) => {
  res.render("adoption/animals", {
    pageTitle: "Save the Dals Pets",
  });
};

// exports.getListView = (req, res, next) => {
//   res.render("adoption/list-view", {
//     pageTitle: "Save the Dals List",
//   });
// };

// exports.getBlogs = (req, res, next) => {

// };

// exports.getBlogDetails = (req, res, next) => {
//   res.render("adoption/blog-details", {
//     pageTitle: "Save the Dals List",
//   });
// };
