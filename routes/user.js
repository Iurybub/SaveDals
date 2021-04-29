const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getHome);
router.get("/animals", userController.getAnimals);
router.get("/animals/:id", userController.getAnimalDetails);
// Posts
router.post("/animals/question", userController.postQuestion);

module.exports = router;
