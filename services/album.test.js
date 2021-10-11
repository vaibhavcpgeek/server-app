const sinon = require("sinon");
const { expect } = require("chai");
const albumService = require("./album");

describe("services/album.js", () => {
  let stubbed;
  const artistId = 12334;

  afterEach(() => {
    stubbed.restore();
  });

  it("list should return correct response", async () => {
    const stub = {
      resultCount: 3,
      results: [
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
      ],
    };

    stubbed = sinon
      .stub(albumService, "albums")
      .callsFake(() => Promise.resolve(stub));

    const albums = await albumService.albums(artistId);
    expect(albums).to.deep.equal(stub);
    expect(albums.resultCount).equal(albums.results.length);
  });
});
