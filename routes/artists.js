const express = require("express");
const router = express.Router();
const albumService = require("../services/album");

/* GET Albums. */
router.get("/:id/albums", async (req, res, next) => {
  const artistId = req.params.id;
  try {
    const albums = await albumService.getAlbums(artistId);
    res.json(albums);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
