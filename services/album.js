const axios = require("axios");
const { API_PATH } = process.env;

const removeDuplicates = (resp) => {
  const results = resp.results.slice(1);
  return results.filter(
    (obj, index, arr) =>
      arr.findIndex((item) => item.collectionName === obj.collectionName) ===
      index
  );
};

const getAlbums = async (artistId) => {
  try {
    const response = await axios.get(API_PATH, {
      params: {
        id: artistId,
        entity: "album",
      },
    });
    return removeDuplicates(response.data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAlbums,
};
