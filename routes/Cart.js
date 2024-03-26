const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
} = require("../Controllers/Cart");
const router = express.Router();

router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);

exports.router = router;
