const config = {
  flickr: {
    baseUrl: "https://www.flickr.com/services/rest/",
    countPictureInPage: 80,
    batchSizeMultiplier: 3,
    headers: {
      "User-Agent": "CygniTest_flickr",
      Accept: "application/json",
    },
  },
  cashing: {
    time: 600,
  },
  rating: {
    time: 60 * 1000, //MS
    max: 30,
  },
};

module.exports = config;
