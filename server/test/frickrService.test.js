const { chunkAndCachePhotos } = require("../src/services/flickrService");
const {
  splitArrayIntoChunks,
  generateCacheKey,
} = require("../src/utils/utils");

describe("chunkAndCachePhotos", () => {
  let mockCache;

  beforeEach(() => {
    mockCache = {
      set: jest.fn(),
      get: jest.fn(),
    };
  });

  it("should calculate correct index", () => {
    const photos = [
      { photoID: 1, title: "tl1" },
      { photoID: 2, title: "tl2" },
      { photoID: 3, title: "tl3" },
      { photoID: 4, title: "tl4" },
      { photoID: 5, title: "tl5" },
      { photoID: 6, title: "tl6" },
    ];
    const searchTerm = "cygni";
    const countPictureInPage = 2;
    const method = "flickr.photos.search";

    const page = 6;
    const batchSizeMultiplier = 3;

    const result = chunkAndCachePhotos(
      photos,
      searchTerm,
      page,
      countPictureInPage,
      batchSizeMultiplier,
      mockCache,
      method
    );

    expect(result).toEqual([
      { photoID: 5, title: "tl5" },
      { photoID: 6, title: "tl6" },
    ]);
  });

  test("should correctly chunk photos array and cache chunks", () => {
    const photos = [
      { photoID: 1, title: "tl1" },
      { photoID: 2, title: "tl2" },
      { photoID: 3, title: "tl3" },
      { photoID: 4, title: "tl4" },
      { photoID: 5, title: "tl5" },
      { photoID: 6, title: "tl6" },
    ];
    const searchTerm = "cygni";
    const page = 1;
    const countPictureInPage = 2;
    const batchSizeMultiplier = 3;
    const method = "flickr.photos.search";

    const result = chunkAndCachePhotos(
      photos,
      searchTerm,
      page,
      countPictureInPage,
      batchSizeMultiplier,
      mockCache,
      method
    );

    expect(mockCache.set).toHaveBeenCalledTimes(3);
    expect(mockCache.set).toHaveBeenNthCalledWith(
      1,
      generateCacheKey({ method, searchTerm, index: 1 }),
      [
        { photoID: 1, title: "tl1" },
        { photoID: 2, title: "tl2" },
      ]
    );
    expect(mockCache.set).toHaveBeenNthCalledWith(
      2,
      generateCacheKey({ method, searchTerm, index: 2 }),
      [
        { photoID: 3, title: "tl3" },
        { photoID: 4, title: "tl4" },
      ]
    );
    expect(mockCache.set).toHaveBeenNthCalledWith(
      3,
      generateCacheKey({ method, searchTerm, index: 3 }),
      [
        { photoID: 5, title: "tl5" },
        { photoID: 6, title: "tl6" },
      ]
    );

    expect(result).toEqual([
      { photoID: 1, title: "tl1" },
      { photoID: 2, title: "tl2" },
    ]);
  });

  test("should return an empty array if photos is empty", () => {
    const photos = [];
    const searchTerm = "nature";
    const page = 1;
    const countPictureInPage = 2;
    const batchSizeMultiplier = 2;
    const method = "flickr.photos.search";

    const result = chunkAndCachePhotos(
      photos,
      searchTerm,
      page,
      countPictureInPage,
      batchSizeMultiplier,
      mockCache,
      method
    );

    expect(mockCache.set).toHaveBeenCalledTimes(0);

    expect(result).toEqual([]);
  });

  test("should correctly return the chunk for a specific page", () => {
    const photos = [
      { photoID: 1, title: "tl1" },
      { photoID: 2, title: "tl2" },
      { photoID: 3, title: "tl3" },
      { photoID: 4, title: "tl4" },
      { photoID: 5, title: "tl5" },
      { photoID: 6, title: "tl6" },
    ];
    const searchTerm = "nature";
    const page = 2;
    const countPictureInPage = 2;
    const batchSizeMultiplier = 2;
    const method = "flickr.photos.search";

    const result = chunkAndCachePhotos(
      photos,
      searchTerm,
      page,
      countPictureInPage,
      batchSizeMultiplier,
      mockCache,
      method
    );

    expect(result).toEqual([
      { photoID: 3, title: "tl3" },
      { photoID: 4, title: "tl4" },
    ]);
  });
});
