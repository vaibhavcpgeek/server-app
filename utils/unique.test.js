const unique = require("./unique");

describe("utils/unique.js", () => {
  test("removes duplicate from collections", () => {
    const collections = [
      {
        collectionId: "1",
        collectionName: "Sleep Through the Static",
        artworkUrl100: "http://example1.com",
      },
      {
        collectionId: "2",
        collectionName: "Sleep Through the Static",
        artworkUrl100: "http://example2.com",
      },
      {
        collectionId: "3",
        collectionName: "Sleep Through the Static (Remix version)",
        artworkUrl100: "http://example3.com",
      },
    ];

    const uniqueCollection = unique(collections);
    console.log(uniqueCollection);
    expect(uniqueCollection.length).toBe(2);
  });
});
