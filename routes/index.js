var express = require("express");
var router = express.Router();
const albumService = require("../services/album");
const unique = require("./../filters/unique");

/* GET default route. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "iTunes API works" });
});

/* GET artists route. */
router.get("/artists", function (req, res, next) {
  // To be Implemented
  res.render("index", { title: "Artists route works" });
});

/* GET individual artist route. */
router.get("/artists/:id", function (req, res, next) {
  // To be Implemented
  res.render("index", { title: "Individual Artist route works" });
});

/* GET default route. */
router.get("/artists/:id/albums", async (req, res, next) => {
  const artistId = req.params.id;
  try {
    const resp = await albumService.albums(artistId);
    const uniqueCollection = unique(resp.results.slice(1));
    res.status(200).json(uniqueCollection);
  } catch (err) {
    res.status(500).json(err, {
      message: "Something went wrong",
    });
  }
});

module.exports = router;
