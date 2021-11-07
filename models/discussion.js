"use strict";

const User = require("./user");

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    datePosted: Date,
	  author: String,
	  description: String,
	  comments: [String]
  });

module.exports = mongoose.model("Discussion", discussionSchema);
