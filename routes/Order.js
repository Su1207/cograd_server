const express = require("express");
const {
  fetchOrdersByUser,
  createOrder,
  deleteFromOrder,
  updateOrder,
  fetchAllOrders,
} = require("../Controllers/Order");
const router = express.Router();

router
  .get("/user/:id", fetchOrdersByUser)
  .get("/", fetchAllOrders)
  .post("/", createOrder)
  .delete("/:id", deleteFromOrder)
  .patch("/:id", updateOrder);

exports.router = router;
