const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

exports.router = router;
