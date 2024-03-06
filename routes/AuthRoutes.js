const { register, login } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();
//secret page, checkuser
router.post("/cards", checkUser);
router.post("/signup", register);
router.post("/login", login);

module.exports = router;