"use strict";

const router = require("express").Router(),
	homeController = require("../controllers/homeController"),
	petController = require("../controllers/petController");

	router.get("", petController.index, homeController.resHome);
	router.get("/index", petController.index, homeController.resHome);

	router.post("/contact-submit", homeController.submitContact);
	router.get("/contact-thanks", homeController.resThanks);
	router.get("/about", homeController.resAbout);
	router.get("/about/contact-us", homeController.resContactUs);
	router.get("/donate", homeController.resDonate);
	router.get("/about/volunteer", homeController.resVolunteer);

module.exports = router;
