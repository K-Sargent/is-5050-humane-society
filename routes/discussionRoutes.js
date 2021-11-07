"use strict";

const router = require("express").Router(),
	discussionController = require("../controllers/discussionController");

router.get("/", discussionController.fetchDiscussions, discussionController.viewAllDiscussions);
router.get("/:id", discussionController.fetchDetails, discussionController.viewDetail);

module.exports = router;
