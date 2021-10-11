const express = require("express");
const router = express.Router();
const albumService = require("../services/album");
const unique = require("./../utils/unique");

/* GET Albums. */
router.get("/:id/albums", async (req, res, next) => {
  const artistId = req.params.id;
  try {
    const resp = await albumService.albums(artistId);
    const uniqueCollection = unique(resp.results.slice(1));
    res.json(uniqueCollection);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
