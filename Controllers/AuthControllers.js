const jwt = require("jsonwebtoken");
const User = require("../models/Auth");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName, userId, role) => {
  return jwt.sign({ userName, userId, role }, "varunUpadhyaySuperSecretKEy", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = {
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
    gender: "",
  };

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message === "Please fill all the details") {
    errors.email = "Please fill all the details";
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, userName, phoneNumber, gender } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !userName || !phoneNumber || !gender) {
      throw Error("Please fill all the details");
    }

    const user = await User.create({
      email,
      password,
      userName,
      phoneNumber,
      gender,
    });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      user: user._id,
      email: user.email,
      name: user.userName,
      created: true,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user.userName, user._id, user.role);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({
      user: { userId: user._id, email: user.email, role: user.role },
      status: true,
    }); // Sending userId, email, and name
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.address = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming you have middleware to extract user ID from JWT

    // Get address data from request body
    const {
      name,
      email,
      contact,
      contactCountry,
      billingAddress,
      landmark,
      pincode,
      district,
      state,
    } = req.body;

    // Create or update user's address
    await User.findByIdAndUpdate(userId, {
      address: {
        name,
        email,
        contact,
        contactCountry,
        billingAddress,
        landmark,
        pincode,
        district,
        state,
      },
    });

    // Respond with success message
    res.status(200).json({ message: "Address saved successfully" });
  } catch (err) {
    // Handle errors...
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
