"use strict";

const discussion = require("../models/discussion");
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
    redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
  	},
    createComment: (req, res, next) => { // handle the creating of event object
        let commentParams = {
            data: req.body.comment,
            author: req.body.author,
		};

        Discussion.updateOne({_id: req.params.id}, { $push: { comments: commentParams } }).then(discussion => {
            res.locals.redirect = `/discussions/${req.params.id}`;
            next();
        }).catch(error => {
            console.log(`Error saving comment to discussion: ${error.message}`);
			next(error);
        });
    },
};
