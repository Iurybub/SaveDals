const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    csrfToken: req.csrfToken(),
    errorMessage: [],
    oldInput: {
      email: "",
      password: "",
    },
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    csrfToken: req.csrfToken(),
    errorMessage: [],
    oldInput: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/signup",
      pageTitle: "Signup",
      csrfToken: req.csrfToken(),
      isAuthenticated: false,
      errorMessage: errors,
    });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).render("auth/login", {
        errorMessage: "Wrong credentials",
        csrfToken: req.csrfToken(),
        oldInput: {
          email: email,
        },
      });
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          res.redirect("/admin");
        });
      }
      return res.status(422).render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        csrfToken: req.csrfToken(),
        errorMessage: "Invalid email or password.",
        validationErrors: [],
        oldInput: {
          email: email,
        },
      });
    });
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      csrfToken: req.csrfToken(),
      oldInput: {
        name: name,
        email: email,
      },
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
    return res.redirect("/");
  });
};
