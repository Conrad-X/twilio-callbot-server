var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const {
  signUp,
  verifyEmail,
  login,
} = require("../controllers/auth.controller");
require("dotenv").config();

router.post("/signup", signUp);
router.post("/verify", verifyEmail);
router.post("/login", login);

module.exports = router;
