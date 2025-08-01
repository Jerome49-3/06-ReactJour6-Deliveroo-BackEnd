const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//model
const Restaurants = require("../../models/Restaurants");

router.post("/restaurant", async (req, res) => {
  console.log("je suis sur la route restaurant (POST)");
  try {
    console.log("req.body:", req.body);
    const newRestaurant = new Restaurants(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
