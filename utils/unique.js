module.exports = (collections) => {
  return collections.filter(
    (obj, index, arr) =>
      arr.findIndex((item) => item.collectionName === obj.collectionName) ===
      index
  );
};
