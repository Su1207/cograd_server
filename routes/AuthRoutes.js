const { register, login, address } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");
const { storeAddress } = require("../controllers/addressController.js")


const router = require("express").Router();
//secret page, checkuser
router.post("/cards", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/address", storeAddress); // New endpoint for storing address



module.exports = router;