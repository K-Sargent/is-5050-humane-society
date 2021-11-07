"use strict";

const User = require("./user");

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    // date: Date,
	// user: mongoose.Schema.Types.ObjectId,
	// description: {
	// 	type: String,
	// 	maxLength: 100
	// },
	// comments: [mongoose.Schema.Types.ObjectId]
    datePosted: Date,
	  author: String,
	  description: String,
	  comments: [String]
  });

module.exports = mongoose.model("Discussion", discussionSchema);
