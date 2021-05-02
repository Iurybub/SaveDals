const express = require("express");
const adminController = require("../controllers/admin");
const { check } = require("express-validator");
const path = require("path");

const router = express.Router();
const ensureAuth = require("../middleware/ensureAuth");

router.get("/", ensureAuth, adminController.getDashboard); //Done
router.get("/category/animals", ensureAuth, adminController.getAnimals);
router.get("/category/animals/add", ensureAuth, adminController.getAddAnimals);
router.get(
  "/category/animals/edit/:id",
  ensureAuth,
  adminController.getEditAnimals
);
router.post(
  "/category/animals/actions/add",
  ensureAuth,
  adminController.postAddAnimal
);
router.post(
  "/category/animals/actions/edit",
  ensureAuth,
  adminController.postEditAnimal
);
router.post(
  "/category/animals/actions/delete/:id",
  ensureAuth,
  adminController.postDeleteAnimal
);

module.exports = router;
