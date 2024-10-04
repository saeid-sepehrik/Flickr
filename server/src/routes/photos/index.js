const express = require("express");
const { Router } = require("express");
const { validatorSearch, validatorPhoto } = require("./validation");
const { controllerSearch, controllerPhoto } = require("./controller");

const router = Router();

router.get("/search", validatorSearch, controllerSearch);
router.get("/:id", validatorPhoto, controllerPhoto);

module.exports = router;
