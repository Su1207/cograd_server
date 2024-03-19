const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  productDescription: { type: String, required: true },
  benefits: { type: [String] },
  productDetails: { type: [String] },
  moreDetails: { type: [String] },
  price: { type: Number, required: true, min: [0, "wrong min price"] },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min percentage"],
    max: [99, "wrong discount percentage"],
  },
  discountPrice: { type: Number },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "wrong min stock"],
    default: 0,
  },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
