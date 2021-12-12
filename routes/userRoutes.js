"use strict";

const router = require("express").Router(),
	userController = require("../controllers/userController"),
	petController = require("../controllers/petController");

	router.post(
		"/create",
		userController.validate,
		userController.create,
		userController.redirectView
	);
	router.get("/login", userController.resLogin);
	router.get("/signup", userController.resSignup);
	router.post("/login/authenticate", userController.authenticate, userController.redirectView);
	router.get("/logout", userController.checkLoggedIn, userController.logout, userController.redirectView);
	router.post("/submit-donation/:id", userController.checkLoggedIn, userController.submitDonation, userController.stripeDonation);
	router.get("/account", userController.checkLoggedIn, petController.getUserPets, userController.resAccount);

module.exports = router;
