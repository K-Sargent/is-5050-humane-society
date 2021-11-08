"use strict";

const News = require("../models/news");

module.exports = {
    fetchNews: (req, res, next) => {
        News.find()
        .then(news => {
            res.locals.news = news;
            next();
        })
        .catch(error => {
            console.log(`Error fetching news: ${error.message}`);
            next(error);
        });
    },
    newsView: (req, res) => {
        res.render("news/index");
    },
    addNews: (req, res) => { // displays form to create news
        res.render("news/add-news");
    },
    create: (req, res, next) => { // handle the creating of news object
        let newsParams = new News({
			title: req.body.title,
			date: new Date(),
			author: req.body.author,
			description: req.body.description,
		});

        News.create(newsParams).then(news => {
			res.locals.redirect = "/news";
			next();
		}).catch(error => {
			console.log(`Error saving news: ${error.message}`);
			next(error);
		});
    },
    redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
  	},
};
