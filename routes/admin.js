const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getIndex);

// For the viewing pleasures
router.get("/blogs", adminController.getBlogs);
router.post("/blogs", adminController.postBlog);
router.get("/blogs/:blogId", adminController.getBlogDetails);

router.get("/animals", adminController.getAnimals);
router.post("/animals", adminController.postAnimal);
router.get("/animals/:animalId", adminController.getAnimalDetails);

module.exports = router;
