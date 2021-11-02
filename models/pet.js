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

  petSchema.virtual("shortDescription").get(function () {return this.description.split(" ").slice(0, 11).join(" ") + "..."});

module.exports = mongoose.model("Pet", petSchema);
