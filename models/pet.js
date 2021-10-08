"use strict";

const mongoose = require("mongoose"),
  petSchema = mongoose.Schema({
    name: String,
	species: String,
	breed: String,
	age: Number,
	gender: String,
	weight: Number,
	price: Number,
	dateAdded: Date,
	description: String,
	houseTrained: Boolean,
	image: String
  });

module.exports = mongoose.model("Pet", petSchema);
