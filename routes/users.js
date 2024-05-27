var express = require("express");
var router = express.Router();
const {
  addUser,
  removeUser,
  getUserList,
  updateUser,
} = require("../controllers/user.controller");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
router.post("/", addUser);
router.post("/updateUser", updateUser);
router.delete("/", removeUser);
router.get("/", getUserList)


module.exports = router;

