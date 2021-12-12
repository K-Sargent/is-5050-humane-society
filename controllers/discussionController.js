"use strict";

const Discussion = require("../models/discussion");
const User = require("../models/user")

module.exports = {
    fetchDiscussions: (req, res, next) => {
        Discussion.find()
		.populate('author')
        .then(discussions => {
			res.locals.discussions = discussions;
			next();
        })
        .catch(error => {
            console.log(`Error fetching discussions: ${error.message}`);
            next(error);
        });
    },
	create: (req, res, next) => { // handle the creating of event object
        let discussionParams = new Discussion({
			author: req.user._id,
			description: req.body.description,
			datePosted: new Date()
		});

        Discussion.create(discussionParams).then(discussion => {
			res.locals.redirect = "/discussions";
			next();
		}).catch(error => {
			console.log(`Error saving discussion: ${error.message}`);
			next(error);
		});
    },
    viewAllDiscussions: (req, res) => {
        res.render("discussions/index");
    },
	newDiscussion: (req, res) => {
		res.render("discussions/add-discussion")
	},
    fetchDetails: (req, res, next) => {
        let discussionId = req.params.id;
		Discussion.findById(discussionId)
		.populate([
			'author',
			{
				path: 'comments',
				populate : 'author'
			}
		])
		.then(discussion => {
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
    createComment: (req, res, next) => {
        let commentParams = {
            data: req.body.comment,
            author: req.user._id,
			date: new Date()
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
