const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Caddy = require("../../models/Caddy");

router.put("/removeQuantity/:id", async (req, res) => {
  console.log("je suis sur la route removeQuantity (PUT)");
  console.log("id on /removeQuantity:", req.params.id);
  const idPanier = req.params.id;
  console.log("idPanier on /removeQuantity:", idPanier);
  const findId = await Caddy.findOne({ idMeal: idPanier });
  console.log("findId on /removeQuantity:", findId);
  const id = findId?._id;
  console.log("id on /removeQuantity:", id);
  if (!id) {
    return res.status(400).json({ message: "ce mets n'est plus disponible" });
  }
  const countSuppCaddy = await Caddy.findByIdAndUpdate(
    id,
    { $inc: { quantity: -1 } },
    {
      new: true,
    }
  );
  suppQuantity = countSuppCaddy.quantity;
  if (suppQuantity <= 0) {
    try {
      const suppCaddy = await Caddy.findByIdAndDelete(id);
      console.log("suppCaddy in /removeQuantity:", suppCaddy);
    } catch (error) {
      console.log("error in /removeQuantity:", error);
    }
  }

  res
    .status(201)
    .json({ panier: countSuppCaddy, quantity: countSuppCaddy.quantity });
  try {
    // Votre logique ici
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
