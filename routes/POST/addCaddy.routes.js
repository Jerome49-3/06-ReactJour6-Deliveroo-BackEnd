const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//models
const Caddy = require("../../models/Caddy");

router.post("/addCaddy", async (req, res) => {
  console.log("je suis sur la route addCaddy (POST)");

  try {
    console.log("req.body in /addCaddy:", req.body);
    const newReqBody = req?.body;
    // newArrCaddy.push(newReqBody);
    const reqPrice = Number(newReqBody?.price);
    console.log("reqPrice in /addCaddy:", reqPrice);
    const newCaddy = new Caddy({
      idMeal: newReqBody.idMeal,
      title: newReqBody.title,
      price: reqPrice,
      quantity: newReqBody.quantity,
      categories: newReqBody.categories,
    });
    console.log("newCaddy /addCaddy:", newCaddy);
    const savedCaddy = await newCaddy.save();
    console.log("savedCaddy /addCaddy:", savedCaddy);
    const allCaddy = await Caddy.find();
    console.log("allCaddy /addCaddy:", allCaddy);
    res.status(201).json(allCaddy);
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
