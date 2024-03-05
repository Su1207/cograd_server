
import dotenv from 'dotenv';
dotenv.config();
import User from './models/User.js';
import Address from './models/Address.js'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();
import bcrypt from 'bcryptjs';
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg"
import stripePackage from "stripe";
const stripe = stripePackage("sk_test_51OpRD5SBlYGeUqKiPs5tziDlHveysWuMEcArXkyksCQmXseJfgrIuXFCudnOPeXWXkc8ZfhxdGOL3upYdLtCHXKx00qHmFmC7h");

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.use(express.json());
app.use(cookieParser());
// mongoose.connect(process.env.MONGO_URL);r84CHkvJYv5llJSr
mongoose.connect("mongodb+srv://varun802vu:r84CHkvJYv5llJSr@cluster0.cwmx4vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.post('/signup', async (req, res) => {
  const { userName, email, password, phoneNumber, gender, dob, addressData } = req.body; // Extract addressData from request body
  try {
    const addressDoc = await Address.create(addressData); // Create address document
    const userDoc = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      phoneNumber,
      gender,
      dob,
      address: addressDoc._id // Assign address document id to user
    });
    res.json({ success: true, message: 'User registered successfully', user: userDoc });
  } catch (e) {
    console.error(e);
    res.status(422).json({ error: e.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({ userId: userDoc._id }); // Return the user ID
        console.log(token)
      });
    } else {
      res.status(422).json('Incorrect password');
    }
  } else {
    res.status(401).json({ message: 'User not found. Please try again.' });
  }
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products)

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

  res.json({ id: session.id })

})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
