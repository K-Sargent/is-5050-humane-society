"use strict";

const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose"),
  userSchema = mongoose.Schema({
    firstName: String,
	lastName: String,
    email: {
		type: String,
		required: true,
		owercase: true,
        unique: true
	},
	priviledged: Boolean,
	zipCode: Number,
	donations: Number,
	adoptions: [mongoose.Schema.Types.ObjectId],
	admin : Boolean,
  });

  userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
  });

module.exports = mongoose.model("User", userSchema);
