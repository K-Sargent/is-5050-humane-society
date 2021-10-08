"use strict";

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
    firstName: String,
	lastName: String,
    email: String,
	password: String,
	priviledged: Boolean,
	petPreference: Array[Pet],
	posts: Array[Post],
    zipCode: Number
  });

module.exports = mongoose.model("User", userSchema);
