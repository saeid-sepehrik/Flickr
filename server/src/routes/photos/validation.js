const { param, query, validationResult } = require("express-validator");
const { createError } = require("../../utils/utils");

const validatorSearch = [
  query("search")
    .notEmpty()
    .withMessage("search term is required!")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "the term's leght must be minimum 3 characters and maximum 30 characters"
    )
    .matches(/^[a-zA-Z0-9\s,]+$/)
    .withMessage("you can just use alpgabetic characters and space"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        createError(
          "The term must be between 2 and 30 characters long and can include letters, numbers, and spaces.",
          400
        )
      );
    }
    next();
  },
];

const validatorPhoto = [
  param("id").notEmpty().withMessage("ID photo is empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(createError("Your request is incomplete, please try again", 400));
    }
    next();
  },
];

module.exports = { validatorSearch, validatorPhoto };
