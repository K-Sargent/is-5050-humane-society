"use strict";

const router = require("express").Router(),
	userController = require("../controllers/userController");

	router.post(
		"/create",
		userController.validate,
		userController.create,
		userController.redirectView
	);
	router.get("/login", userController.resLogin);
	router.get("/signup", userController.resSignup);
	router.post("/login/authenticate", userController.authenticate, userController.redirectView);
	router.get("/logout", userController.logout, userController.redirectView);
	router.post("/submit-donation/:id", userController.submitDonation, userController.redirectView);
	router.get("/account", userController.resAccount);

module.exports = router;
