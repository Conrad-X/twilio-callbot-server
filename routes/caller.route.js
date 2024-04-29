var express = require("express");
var router = express.Router();

const {
  addCaller,
  removeCaller,
  getCallerList,
  getCallerListPaginated,
  updateCaller,
} = require("../controllers/caller.controller");

router.post("/", addCaller);
router.post("/updateCaller", updateCaller);
router.delete("/", removeCaller);
router.get("/paginatedcallers", getCallerListPaginated);
router.get("/", getCallerList);

module.exports = router;
