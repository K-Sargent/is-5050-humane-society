"use strict";

const User = require("./user");

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    datePosted: Date,
	// author: mongoose.Schema.Types.ObjectId,
	author: String,
	description: {
  		type: String,
  		maxLength: 100
  	},
	comments: [String]
	// comments: [mongoose.Schema.Types.ObjectId]
  });

module.exports = mongoose.model("Discussion", discussionSchema);
