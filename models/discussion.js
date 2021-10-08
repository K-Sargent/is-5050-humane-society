"use strict";

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    date: Date,
	user: User,
	description: String,
	comments: Discussion
  });

module.exports = mongoose.model("Discussion", discussionSchema);
