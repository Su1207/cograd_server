const { Product } = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }
  let query = Product.find(condition);
  let totalProductquery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductquery = totalProductquery.find({
      category: req.query.category,
    });
  }
  // if (req.query.brand) {
  //   query = query.find({ brand: req.query.brand });
  //   totalProductquery.totalProductquery.find({ brand: req.query.brand });
  // }
  // if (req.query._sort && req.query._order) {
  //   query = query.sort({ [req.query._sort]: req.query._order });
  // }

  const totalDocs = await totalProductquery.count().exec();

  // if (req.query._page && req.query._limit) {
  //   const pageSize = req.query._limit;
  //   const page = req.query._page;
  //   query = query.skip(pageSize * (page - 1)).limit(pageSize);
  // }

  try {
    const response = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
