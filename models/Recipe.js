const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    prepTime: {
      type: String,
      required: true,
    },
    cookTime: {
      type: String,
      required: true,
    },
    ingredient: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    servings: {
      type: String,
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
    purchased_by: {
      type: [String],
    },
    watchCount: {
      type: Number,
      default: 0,
    },
    fav: {
      type: [String],
    },
    photo: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
