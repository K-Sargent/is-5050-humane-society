"use strict";

const User = require("./user");

const mongoose = require("mongoose"),
discussionSchema = mongoose.Schema({
	datePosted: Date,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'},
	description: {
		type: String,
		maxLength: 100,
	},
	comments: [{
		data: String,
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'}, 
		date: Date
	}]
});

discussionSchema.virtual("preview").get(function () {return this.description.split(" ").slice(0, 8).join(" ") + "..."});

module.exports = mongoose.model("Discussion", discussionSchema);
