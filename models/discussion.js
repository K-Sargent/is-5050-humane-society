"use strict";

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    date: Date,
	user: User,
	description: String,
	comments: [mongoose.Schema.Types.ObjectId]
  });

module.exports = mongoose.model("Discussion", discussionSchema);
