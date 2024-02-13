var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/verify", function (req, res, next) {
  try {
    const userID = jwt.verify(req.query.token, process.env.JWT_SECRET_KEY);
    console.log(userID);
  } catch (err) {
    console.log(err);
  }
  res.send("success");
});

module.exports = router;
