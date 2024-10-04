const axios = require("axios");
const config = require("../config/config");
const NodeCache = require("node-cache");
const {
  splitArrayIntoChunks,
  generateCacheKey,
  createError,
  buildFlickrUrl,
} = require("../utils/utils");

const cachingTime = config.cashing.time;
const cache = new NodeCache({ stdTTL: cachingTime });

const searchPhotos = async (searchTerm, page, res, next) => {
  const { countPictureInPage, batchSizeMultiplier, headers } = config.flickr;

  const method = "flickr.photos.search";
  const keyCache = generateCacheKey({ method, searchTerm, page });
  const cachePhotos = cache.get(keyCache);
  if (cachePhotos) {
    res.resource = "GET FROM CACHE";
    return cachePhotos;
  }

  const bigPageNumber = Math.ceil(page / batchSizeMultiplier);
  const countInBigPage = countPictureInPage * batchSizeMultiplier;

  const url = buildFlickrUrl({
    method: "flickr.photos.search",
    text: searchTerm,
    page: bigPageNumber,
    per_page: countInBigPage,
  });

  try {
    const response = await axios.get(url, { headers });
    const isResponseOk = response.data.stat === "ok";
    if (isResponseOk) {
      res.set("Count-In-Page", countPictureInPage);
      res.set("Access-Control-Expose-Headers", "Count-In-Page");
      const photoJson = response.data.photos.photo.map((photo) => ({
        id: photo.id,
        title: photo.title,
        imageUrl: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
      }));

      const dataForReturn = chunkAndCachePhotos(
        photoJson,
        searchTerm,
        page,
        countPictureInPage,
        batchSizeMultiplier,
        cache,
        method
      );
      res.resource = "GET FROM API";
      return dataForReturn;
    } else {
      next(createError(`Flickr API Error: ${response.data.message}`));
    }
  } catch (error) {
    next(createError(`Axios Error: ${error.message}`));
  }
};

const chunkAndCachePhotos = (
  photos,
  searchTerm,
  page,
  countPictureInPage,
  batchSizeMultiplier,
  cache,
  method
) => {
  const chunkedArray = splitArrayIntoChunks(photos, countPictureInPage);

  let dataForReturn = [];
  let index =
    Math.ceil(page / batchSizeMultiplier) * batchSizeMultiplier -
    (batchSizeMultiplier - 1);

  chunkedArray.forEach((photoChunk) => {
    const keyCache = generateCacheKey({ method, searchTerm, index });
    cache.set(keyCache, photoChunk);
    if (index === page) {
      dataForReturn = photoChunk;
    }
    index++;
  });

  return dataForReturn;
};

const photoDetails = async (id, res, next) => {
  const method = "flickr.photos.getInfo";
  const keyCache = generateCacheKey({ method, id });

  const cachePhoto = cache.get(keyCache);
  if (cachePhoto) {
    res.resource = "GET FROM CACHE";
    return cachePhoto;
  }

  const url = buildFlickrUrl({ method, photo_id: id });
  const { headers } = config.flickr;
  try {
    const response = await axios.get(url, { headers });
    const isResponseOk = response.data.stat === "ok";
    if (isResponseOk) {
      const { id, title, description, server, secret, owner } =
        response.data.photo;
      const photoDetailsFormatted = {
        id,
        title: title._content,
        description: description._content,
        imageUrl: `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`,
        owner: {
          id: owner.nsid,
          username: owner.username,
        },
      };

      cache.set(keyCache, photoDetailsFormatted);
      res.resource = "GET FROM API";

      return photoDetailsFormatted;
    }
    next(createError(response.data.message));
  } catch (error) {
    next(createError(error.message));
  }
};

module.exports = { searchPhotos, photoDetails, chunkAndCachePhotos };
