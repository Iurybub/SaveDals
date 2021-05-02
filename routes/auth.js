const express = require("express");
const { check, body } = require("express-validator");
const authController = require("../controllers/auth");
const User = require("../models/user");
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userResult) => {
        if (userResult) {
          return Promise.reject(
            "E-mail already exists, please pick a difference"
          );
        }
      });
    }),

  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Your password must be at least 6 to 16 characters long"),
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password must match");
    }
    return true;
  }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
