const express = require("express");
const {GenerateNewShortID} = require("../controller/url_contro");
const router = express.Router();

router.post("/", GenerateNewShortID);

module.exports = router ;