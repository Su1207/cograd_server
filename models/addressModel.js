// models/Address.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AddressSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String },
  email: { type: String },
  contact: { type: String },
  contactCountry: { type: String },
  billingAddress: { type: String },
  landmark: { type: String },
  pincode: { type: String },
  district: { type: String },
  state: { type: String },
});

module.exports = mongoose.model("Address", AddressSchema);
