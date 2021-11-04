"use strict";

const Event = require("../models/event");

module.exports = {
    fetchEvents: (req, res, next) => {
        Event.find()
            .then(events => {
                // sort events by date
                events.sort((a, b) => { 
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                res.locals.events = events;
                next();
            })
            .catch(error => {
                console.log(`Error fetching events: ${error.message}`);
                next(error);
            });
    },
    eventView: (req, res) => {
        res.render("events/index");
    },
    addEvent: (req, res) => { // displays form to create event
        res.render("events/add-event");
    },
    create: (req, res, next) => { // handle the creating of event object
        let eventParams = new Event({
			title: req.body.title,
			date: req.body.date,
			location: req.body.location,
			description: req.body.description,
		});

        Event.create(eventParams).then(event => {
			res.locals.redirect = "/events";
			next();
		}).catch(error => {
			console.log(`Error saving event: ${error.message}`);
			next(error);
		});
    },
    redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
  	},
};