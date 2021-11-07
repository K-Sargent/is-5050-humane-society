"use strict";

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    date: Date,
	user: mongoose.Schema.Types.ObjectId,
	description: {
		type: String,
		maxLength: 100
	},
	comments: [mongoose.Schema.Types.ObjectId]
  });

module.exports = mongoose.model("Discussion", discussionSchema);
