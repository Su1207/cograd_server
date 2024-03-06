const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
} = require("../controllers/Cart");
const router = express.Router();

router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);

exports.router = router;
