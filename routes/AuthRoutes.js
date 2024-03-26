const { register, login, address } = require("../Controllers/AuthControllers");
const { checkUser } = require("../middlewares/authMiddleware.js");
const {
  storeAddress,
  findAddressesByUserId,
} = require("../Controllers/addressController.js");

const router = require("express").Router();
//secret page, checkuser
router.post("/cards", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/address", storeAddress); // New endpoint for storing address
router.get("/getaddress/:userId", findAddressesByUserId);

module.exports = router;
