"use strict";

const discussion = require("../models/discussion");

const router = require("express").Router(),
	discussionController = require("../controllers/discussionController");

router.get("/", discussionController.fetchDiscussions, discussionController.viewAllDiscussions);
router.get("/new-discussion", discussionController.newDiscussion);
router.post("/create", discussionController.create, discussionController.redirectView);
router.post("/:id/postComment", discussionController.createComment, discussionController.redirectView);
router.get("/:id", discussionController.fetchDetails, discussionController.viewDetail);

module.exports = router;
