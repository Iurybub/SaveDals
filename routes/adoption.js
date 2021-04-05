const express = require("express");

const adoptionController = require("../controllers/adoption");

const router = express.Router();

router.get("/", adoptionController.getIndex);
router.get("/animals", adoptionController.getAnimals);
router.get("/animals/:animalId", adoptionController.getAnimalDetails);
router.post("/animals/:animalId", adoptionController.postAnimalAdoptionRequest);
router.get("/blogs", adoptionController.getBlogs);
router.get("/blogs/:blogId", adoptionController.getBlogDetails);
router.get("/contact", adoptionController.getContactRequest);
router.post("/contact", adoptionController.postContactRequest);

module.exports = router;
