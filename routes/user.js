const express = require("express");
const userController = require("../controllers/user");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", userController.getHome);
router.get("/animals", userController.getAnimals);
router.get("/animals/adopt/getquestionaire", userController.getQuestionaire);
router.get("/animals/:id", userController.getAnimalDetails);
// Posts
router.post(
  "/animals/question",
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  userController.postQuestion
);
router.post(
  "/animals/adopt",
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  userController.postRequest
);

module.exports = router;
