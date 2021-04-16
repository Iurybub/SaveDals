const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();
const ensureAuth = require("../middleware/ensureAuth");

router.get("/", ensureAuth, adminController.getDashboard); //Done

router.get("/animals", ensureAuth, adminController.getAnimals); //Done
router.get(
  "/animals/details/:id",
  ensureAuth,
  adminController.getAnimalDetails
);
router.get("/animals/add-new", ensureAuth, adminController.getAddNew);
router.post("/animals/add-new-post", ensureAuth, adminController.postAddNew);
// router.get("/animals/pending", adminController.getPending);
// router.post("/animals/pending/:id", adminController.postPending);
// router.get("/animals/questions", adminController.getQuestions);

module.exports = router;
