"use strict";

const router = require("express").Router(),
	eventController = require("../controllers/eventController");

router.get("/", eventController.fetchEvents, eventController.eventView);
router.get("/add-event", eventController.addEvent);
router.post("/create", eventController.create, eventController.redirectView);

module.exports = router;
