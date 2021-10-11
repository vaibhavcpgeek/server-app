var express = require("express");
var router = express.Router();

/* GET default route. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "iTunes API works" });
});

module.exports = router;
