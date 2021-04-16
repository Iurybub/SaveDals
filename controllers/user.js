const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Request = require("../models/Request");
const Question = require("../models/Question");

exports.getHome = (req, res, next) => {
  res.render("user/home", {
    pageTitle: "Home Dals",
    isAuth: req.session.isAuth,
  });
};
