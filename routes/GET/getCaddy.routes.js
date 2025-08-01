const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//models
const Caddy = require("../../models/Caddy");

router.get("/getCaddy", async (req, res) => {
  console.log("je suis sur la route /getCaddy (GET)");
  try {
    const getCaddy = await Caddy.find();
    console.log("getCaddy in /getCaddy:", getCaddy);
    res.status(201).json({ panier: getCaddy });
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
