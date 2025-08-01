const mongoose = require("mongoose");

const caddySchema = new mongoose.Schema({
  idMeal: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: { type: Number, default: 1 },
  categories: {
    type: String,
  },
});
const Caddy = mongoose.model("Caddy", caddySchema);
module.exports = Caddy;
