const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getHome);
router.get("/animals/:id", userController.getAnimalDetails);
router.get("/animals", userController.getAnimals);
// Posts
router.post("/animals/question", userController.postQuestion);

module.exports = router;
