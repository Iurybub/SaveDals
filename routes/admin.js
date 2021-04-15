const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getDashboard); //Done

router.get("/animals", adminController.getAnimals); //Done
router.get("/animals/details/:id", adminController.getAnimalDetails);
router.get("/animals/add-new", adminController.getAddNew);
router.post("/animals/add-new-post", adminController.postAddNew);
// router.get("/animals/pending", adminController.getPending);
// router.post("/animals/pending/:id", adminController.postPending);
// router.get("/animals/questions", adminController.getQuestions);

module.exports = router;
