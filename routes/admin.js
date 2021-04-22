const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();
const ensureAuth = require("../middleware/ensureAuth");

router.get("/", ensureAuth, adminController.getDashboard); //Done
router.get("/category/animals/add", ensureAuth, adminController.getAdd); // Done
router.get("/category/animals", ensureAuth, adminController.getAnimals); // Done
router.get("/category/animals/edit/:id", ensureAuth, adminController.getEdit); //Done
router.get("/category/questions", ensureAuth, adminController.getQuestions);

router.post(
  "/category/animals/actions/add",
  ensureAuth,
  adminController.postAdd
);
router.post(
  "/category/animals/actions/edit/:id",
  ensureAuth,
  adminController.postEdit
);
router.post(
  "/category/animals/actions/delete/:id",
  ensureAuth,
  adminController.postDelete
);

module.exports = router;
