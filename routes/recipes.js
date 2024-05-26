const express = require("express");
const {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getSingleRecipe,
  updateRecipe,
  getCountryCategory,
} = require("../controllers/recipe.js");
const { createJWT } = require("../utils/verifyToken.js");

const router = express.Router();

//Create new data
router.post("/", createRecipe, createJWT);

//Update data
router.put("/:id", updateRecipe);

//Delete
router.delete("/:id", deleteRecipe);

//Get single data
router.get("/:id", getSingleRecipe);

//Get all data
router.get("/", getAllRecipe);

//Get all data
router.get("/get-all/info", getCountryCategory);

module.exports = router;
