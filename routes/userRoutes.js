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
	router.get("/:id", userController.resAccount);
	router.get("/submit-donation/:id", userController.submitDonation, userController.redirectView);

module.exports = router;
