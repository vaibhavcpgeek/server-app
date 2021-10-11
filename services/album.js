const axios = require("axios");
const { API_PATH } = process.env;

const fetchData = async (artistId) => {
  try {
    const resp = await axios.get(API_PATH, {
      params: {
        id: artistId,
        entity: "album",
      },
    });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  albums: fetchData,
};
