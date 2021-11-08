"use strict";

const router = require("express").Router(),
	newsController = require("../controllers/newsController");

router.get("/", newsController.fetchNews, newsController.newsView);
router.get("/add-news", newsController.addNews);
router.post("/create", newsController.create, newsController.redirectView);

module.exports = router;
