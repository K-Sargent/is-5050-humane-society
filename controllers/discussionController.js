"use strict";

const Discussion = require("../models/discussion");

module.exports = {
    fetchDiscussions: (req, res, next) => {
        Discussion.find()
        .then(discussions => {
            res.locals.discussions = discussions;
            next();
        })
        .catch(error => {
            console.log(`Error fetching discussions: ${error.message}`);
            next(error);
        });
    },
    viewAllDiscussions: (req, res) => {
        res.render("discussions/index");
    },
    fetchDetails: (req, res, next) => {
        let discussionId = req.params.id;
		Discussion.findById(discussionId).then(discussion => {
			res.locals.discussion = discussion;
			next();
		}).catch(error => {
			console.log(`Error fetching discussion by ID: ${error.message}`);
			next(error);
		});
    },
    viewDetail: (req, res) => {
        res.render("discussions/thread");
    },
};