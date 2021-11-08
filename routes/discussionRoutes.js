"use strict";

const discussion = require("../models/discussion");

const router = require("express").Router(),
	discussionController = require("../controllers/discussionController");

router.get("/", discussionController.fetchDiscussions, discussionController.viewAllDiscussions);
router.get("/:id", discussionController.fetchDetails, discussionController.viewDetail);
router.post("/:id/postComment", discussionController.createComment, discussionController.redirectView);

module.exports = router;
