const mongoose = require("mongoose");

const CategoryShema = require("./Category");

const RestaurantsSchema = new mongoose.Schema({
  restaurant: {
    path: { type: String },
    name: { type: String },
    categories: { type: Array },
    price: { type: String },
    phone: { type: String },
    percentage: { type: Number },
    ratings: { type: String },
    address: { type: String },
    delay: { type: String },
    description: { type: String },
    picture: { type: String },
    client_address: {
      coordinates: { type: Array },
      locality: { type: String },
      country: { type: String },
      formatted_address: { type: String },
      post_code: { type: String },
      route: { type: String },
      street_number: { type: String },
      city: { type: String },
    },
  },
  categories: [CategoryShema],
});

const Restaurants = mongoose.model("Restaurants", RestaurantsSchema);
module.exports = Restaurants;
