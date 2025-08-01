const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Caddy = require("../../models/Caddy");

router.put("/addQuantity/:id", async (req, res) => {
  console.log("je suis sur la route addQuantity (PUT)");
  console.log("req.params:", req.params);

  console.log("id on /addQuantity:", req.params.id);
  try {
    const idPanier = req.params.id;
    console.log("idPanier on /addQuantity:", idPanier);
    console.log("typeof idPanier on /addQuantity:", typeof idPanier);
    const findId = await Caddy.findOne({ idMeal: idPanier });
    console.log("findId on /addQuantity:", findId);
    const id = findId?._id;
    console.log("id on /addQuantity:", id);
    if (!findId) {
      return res.status(400).json({ message: "ce mets n'est plus disponible" });
    }
    const countAddQuantity = await Caddy.findByIdAndUpdate(
      id,
      { $inc: { quantity: +1 } },
      {
        new: true,
      }
    );
    // console.log("countAddCaddy in /removeQuantity:", countAddCaddy);
    if (!countAddQuantity) {
      return res
        .status(400)
        .json({ message: "impossible d'ajouter une quantité" });
    } else {
      const newPrice = countAddQuantity.price;
      console.log("newPrice in addQuantity/:id:", newPrice);
      const multiplyPrice = await Caddy.findByIdAndUpdate(
        id,
        { $inc: { price: newPrice } },
        {
          new: true,
        }
      );
      console.log("multiplyPrice in addQuantity/:id:", multiplyPrice);
      res
        .status(201)
        .json({ panier: multiplyPrice, quantity: countAddQuantity.quantity });
    }
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
