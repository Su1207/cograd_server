
import dotenv from 'dotenv';
dotenv.config();
import User from './models/User.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();
import bcrypt from 'bcryptjs';
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret ="fasefraw4r5r3wq45wdfgw34twdfg"

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
    const { userName, email, password } = req.body;
     try {
      const userDoc = await User.create({
        userName,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json({ success: true, message: 'User registered successfully', user: userDoc });
    } catch (e) {

      console.error(e); // Log the error to the console
      res.status(422).json({ error: e.message }); // Return a meaningful error message in the response

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
        res.cookie('token', token).json(userDoc);
        console.log(token)
      });
    } else {
      res.status(422).json('Incorrect password');
    }
  } else {
    // Handle user not found scenario
    res.status(401).json({ message: 'User not found. Please try again.' }); // Send an error message
    // OR
    // redirectTofront(); // Redirect to a dedicated "login failed" page
  }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
