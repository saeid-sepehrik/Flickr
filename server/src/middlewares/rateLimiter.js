const limiteRate = require("express-rate-limit");
const { createError } = require("../utils/utils");
const config = require("../config/config");

const { time, max } = config.rating;
const limiter = limiteRate({
  windowMS: time,
  max: max,

  handler: (req, res, next) => {
    const errorMessage =
      "There is currently a limit on submitting requests, please try again later!";
    next(createError(errorMessage, 429));
  },
});

module.exports = limiter;
