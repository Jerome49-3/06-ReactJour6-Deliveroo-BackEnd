const mongoose = require("mongoose");

const MealSchema = require("./Meal");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  meals: [MealSchema],
});

module.exports = CategorySchema;
