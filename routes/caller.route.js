var express = require("express");
var router = express.Router();

const {
  addCaller,
  removeCaller,
  getCallerList,
} = require("../controllers/caller.controller");

router.post("/", addCaller);
router.delete("/", removeCaller);
router.get("/", getCallerList);

module.exports = router;
