const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Restaurants = require("../../models/Restaurants");

router.get("/getRestaurant", async (req, res) => {
  console.log("je suis sur la route getRestaurant (GET)");

  try {
    const resto = await Restaurants.find().populate("categories");
    console.log("resto in /getRestaurant:", resto);
    res.status(201).json(resto);
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
