const express = require("express");
const { fetchCategories, createCategory } = require("../Controllers/Category");
const router = express.Router();

router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
