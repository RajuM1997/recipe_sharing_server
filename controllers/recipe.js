const Recipe = require("../models/Recipe.js");

const createRecipe = async (req, res, next) => {
  const newRecipe = new Recipe(req.body);
  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  console.log(req.body);
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("Recipe has been deleted");
  } catch (err) {
    next(err);
  }
};

const getSingleRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

const getAllRecipe = async (req, res, next) => {
  const { page, limit, ...others } = req.query;
  const skip = (page - 1) * limit;
  if (others.recipeName === "" || others.recipeName === null) {
    delete others.recipeName;
  }
  if (
    others.category === "" ||
    others.category === null ||
    others.category === "undefined"
  ) {
    delete others.category;
  }
  if (others.country === "" || others.country === null) {
    delete others.country;
  }
  console.log(skip);
  try {
    const recipe = await Recipe.find({
      ...others,
    })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};
const getCountryCategory = async (req, res, next) => {
  try {
    const categories = await Recipe.find().distinct("category");
    const countries = await Recipe.find().distinct("country");
    res.status(200).json({ categories, countries });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getSingleRecipe,
  getAllRecipe,
  getCountryCategory,
};
