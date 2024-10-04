const config = require("../config/config");

const splitArrayIntoChunks = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const generateCacheKey = (params) => {
  return Object.values(params)
    .filter((param) => param !== undefined && param !== null)
    .join("-");
};

const createError = (message, code = 500) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

const buildFlickrUrl = ({ method, text, page, per_page, photo_id }) => {
  const { baseUrl } = config.flickr;
  const FLICKR_KEY = process.env.FLICKR_KEY;

  const url = new URL(baseUrl);
  url.searchParams.append("method", method);
  url.searchParams.append("api_key", FLICKR_KEY);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", "1");

  if (text) url.searchParams.append("text", text);
  if (page) url.searchParams.append("page", page);
  if (per_page) url.searchParams.append("per_page", per_page);
  if (photo_id) url.searchParams.append("photo_id", photo_id);

  return url.toString();
};

module.exports = {
  splitArrayIntoChunks,
  generateCacheKey,
  createError,
  buildFlickrUrl,
};
