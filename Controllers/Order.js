const { Order } = require("../models/Order");

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const response = await order.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Order.findByIdAndDelete(id);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({ deleted: { $ne: true } });
  let totalOrdersquery = Order.find({ deleted: { $ne: true } });

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersquery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const response = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
