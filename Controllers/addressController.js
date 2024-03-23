const Address = require("../models/addressModel"); // Assuming you have an address model

module.exports.storeAddress = async (req, res, next) => {
  try {
    // Extract address data from request body
    const { userId, name, email, contact, contactCountry, billingAddress, landmark, pincode, district, state } = 
    req.body;

    // Create a new address instance
    const newAddress = new Address({
      userId,
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

module.exports.findAddressesByUserId = async (req, res, next) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.userId;

    // Find addresses with the matching user ID
    const addresses = await Address.find({ userId });
    // Log the found addresses
    console.log("Addresses found:", addresses);
    // Send response with found addresses
    res.status(200).json({ addresses });
  } catch (error) {
    // Handle errors
    console.error("Error finding addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};