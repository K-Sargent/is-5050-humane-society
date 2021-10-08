"use strict";

const mongoose = require("mongoose"),
  newsSchema = mongoose.Schema({
    date: Date,
	title: String,
	description: String,
	author: String
  });

module.exports = mongoose.model("News", newsSchema);
