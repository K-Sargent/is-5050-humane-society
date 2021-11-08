"use strict";

const User = require("./user");

const mongoose = require("mongoose"),
  discussionSchema = mongoose.Schema({
    datePosted: Date,
	// author: mongoose.Schema.Types.ObjectId,
	author: String,
	description: {
  		type: String,
  		maxLength: 100,
  	},
	comments: [{ data: String, author: String }]
	// comments: [mongoose.Schema.Types.ObjectId]
  });

discussionSchema.virtual("preview").get(function () {return this.description.split(" ").slice(0, 8).join(" ") + "..."});

module.exports = mongoose.model("Discussion", discussionSchema);
