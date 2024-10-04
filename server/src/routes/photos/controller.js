const { searchPhotos, photoDetails } = require("../../services/flickrService");
const { createError } = require("../../utils/utils");

const controllerSearch = [
  async (req, res, next) => {
    const searchTerm = req.query.search;
    const page = parseInt(req.query.page) || 1;

    try {
      const photosJson = await searchPhotos(searchTerm, page, res, next);
      if (photosJson) {
        res.json(photosJson);
      }
    } catch (error) {
      const err = new Error(error.message);
      err.status = 500;
      next(err);
    }
  },
];

const controllerPhoto = [
  async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultPhotosdetails = await photoDetails(id, res, next);
      if (resultPhotosdetails) {
        res.json(resultPhotosdetails);
      }
    } catch (error) {
      next(createError(error.message));
    }
  },
];

module.exports = { controllerSearch, controllerPhoto };
