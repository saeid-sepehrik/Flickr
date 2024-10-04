const express = require("express");
const router = express.Router();
const photos = require("./photos");
require("dotenv").config();

router.use("/photos", photos);

module.exports = router;
