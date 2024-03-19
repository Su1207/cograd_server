const { config } = require("dotenv");

config();
// const User = require('./model/UserModel.js');
// const Address = require('./models/Address.js');
const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");

const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
const stripePackage = require("stripe");
const stripe = stripePackage(
  "sk_test_51OpRD5SBlYGeUqKiPs5tziDlHveysWuMEcArXkyksCQmXseJfgrIuXFCudnOPeXWXkc8ZfhxdGOL3upYdLtCHXKx00qHmFmC7h"
);

connectDB();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
app.use("/products", productsRouter.router);
app.use("/categories", categoriesRouter.router);
app.use("/cart", cartRouter.router);
app.use("/order", orderRouter.router);

// mongoose.connect(process.env.MONGO_URL);r84CHkvJYv5llJSr
async function connectDB() {
  await mongoose
    .connect(
      "mongodb+srv://varun802vu:lxzfDPmKJStIFheD@cluster0.cwmx4vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((c) => console.log(`Connected to ${c.connection.host}`))
    .catch((err) => console.log(err));
}

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products);

  // const lineItems = products.map((product)=>({
  //     price_data:{
  //         currency:"inr",
  //         product_data:{
  //             name:product.dish,
  //             images:[product.imgdata]
  //         },
  //         unit_amount:product.price * 100,
  //     },
  //     quantity:product.qnty
  // }));
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr", // Change the currency as required
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100, // Convert price to paise (1 rupee = 100 paise)
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/sucess",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});
