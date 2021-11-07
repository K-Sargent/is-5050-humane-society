"use strict";

const router = require("express").Router(),
	newsController = require("../controllers/newsController");

router.get("/", newsController.newsView);

module.exports = router;
