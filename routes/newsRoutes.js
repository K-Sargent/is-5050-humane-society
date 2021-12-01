"use strict";

const userController = require("../controllers/userController");  // use this for checking logged in admin
const router = require("express").Router(),
	newsController = require("../controllers/newsController");

router.get("/", newsController.fetchNews, newsController.newsView);
router.get("/add-news", userController.checkAdminLoggedIn, newsController.addNews);
router.post("/create", userController.checkAdminLoggedIn, newsController.create, newsController.redirectView);

module.exports = router;
