"use strict";

const News = require("../models/news");

module.exports = {
    newsView: (req, res) => {
        res.render("news/index");
    },
};
