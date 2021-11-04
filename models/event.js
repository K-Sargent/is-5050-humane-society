"use strict";

const mongoose = require("mongoose"),
  eventSchema = mongoose.Schema({
    date: Date,
    location: String,
	  title: String,
	  description: String
  });

module.exports = mongoose.model("Event", eventSchema);
