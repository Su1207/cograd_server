const { register, login, address } = require("../controllers/AuthControllers");
const { checkUser } = require("../middlewares/AuthMiddleware.js");
const {
  storeAddress,
  findAddressesByUserId,
} = require("../controllers/AddressController.js");

const router = require("express").Router();
//secret page, checkuser
router.post("/cards", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/address", storeAddress); // New endpoint for storing address
router.get("/getaddress/:userId", findAddressesByUserId);

module.exports = router;
