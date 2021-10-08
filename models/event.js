"use strict";

const mongoose = require("mongoose"),
  eventSchema = mongoose.Schema({
    date: Date,
	title: String,
	description: String
  });

module.exports = mongoose.model("Event", eventSchema);
