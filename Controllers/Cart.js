const { Cart } = require("../models/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  // const { userId } = req.query;
  const cart = new Cart(req.body);
  try {
    const response = await cart.save();
    const result = response.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Cart.findByIdAndDelete(id);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = cart.populate("product");

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};
