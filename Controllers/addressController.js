const Address = require("../models/addressModel"); // Assuming you have an address model

module.exports.storeAddress = async (req, res, next) => {
  try {
    // Extract address data from request body
    const { name, email, contact, contactCountry, billingAddress, landmark, pincode, district, state } = req.body;
    
    // Create a new address instance
    const newAddress = new Address({
      name,
      email,
      contact,
      contactCountry,
      billingAddress,
      landmark,
      pincode,
      district,
      state,
    });

    // Save the address to the database
    await newAddress.save();

    // Send response
    res.status(201).json({ message: "Address stored successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error storing address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
