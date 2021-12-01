"use strict";

const userController = require("../controllers/userController");  // use this for checking logged in admin
const router = require("express").Router(),
	eventController = require("../controllers/eventController");

router.get("/", eventController.fetchEvents, eventController.eventView);
router.get("/add-event", userController.checkAdminLoggedIn, eventController.addEvent);
router.post("/create", userController.checkAdminLoggedIn, eventController.create, eventController.redirectView);

module.exports = router;
