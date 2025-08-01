const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: String },
  picture: { type: String },
  url: { type: String },
  popular: { type: Boolean },
  quantity: { type: Number, default: 0 },
});

module.exports = MealSchema;
