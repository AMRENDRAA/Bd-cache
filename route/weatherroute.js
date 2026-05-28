const express = require("express");
const router = express.Router();

const { getWeatherData } = require("../controller/weathercontroller")
router.get('/', getWeatherData);

module.exports = router;
