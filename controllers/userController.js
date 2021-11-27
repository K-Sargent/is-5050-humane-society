"use strict";
const {check, validationResult} = require("express-validator");
const User = require("../models/user"),
passport = require("passport"),
getUserParams = body => {
	return {
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		donations: 0
	};
};

module.exports = {
	resAccount: (req, res) => {
		res.render("users/account");
	},
	resLogin: (req, res) => {
		res.render("users/login");
	},
	resSignup: (req, res) => {
		res.render("users/signup");
	},
	index: (req, res, next) => {
		User.find()
		.then(users => {
			res.locals.users = users;
			next();
		})
		.catch(error => {
			console.log(`Error fetching users: ${error.message}`);
			next(error);
		});
	},
	indexView: (req, res) => {
		res.render("users/index");
	},
	new: (req, res) => {
		res.render("users/new");
	},
	create: (req, res, next) => {
		if (req.skip) next();
		let newUser = new User(getUserParams(req.body));
		User.register(newUser, req.body.password, (error, user) => {
			if (user) {
				req.flash("user account created successfully!");
				res.locals.redirect = "/index";
				next();
			} else {
				req.flash("error", `Failed to create user account because: ${error.message}.`);
				res.locals.redirect = "/users/signup";
				next();
			}
		});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();
	},
	show: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
		.then(user => {
			res.locals.user = user;
			next();
		})
		.catch(error => {
			console.log(`Error fetching user by ID: ${error.message}`);
			next(error);
		});
	},
	edit: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
		.then(user => {
			res.render("users/edit", {
				user: user
			});
		})
		.catch(error => {
			console.log(`Error fetching user by ID: ${error.message}`);
			next(error);
		});
	},
	update: (req, res, next) => {
		let userId = req.params.id,
		userParams = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		};
		User.findByIdAndUpdate(userId, {
			$set: userParams
		})
		.then(user => {
			res.locals.redirect = `/users/${userId}`;
			res.locals.user = user;
			next();
		})
		.catch(error => {
			console.log(`Error updating user by ID: ${error.message}`);
			next(error);
		});
	},
	delete: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndRemove(userId)
		.then(() => {
			res.locals.redirect = "/users";
			next();
		})
		.catch(error => {
			console.log(`Error deleting user by ID: ${error.message}`);
			next();
		});
	},

	login: (req, res) => {
		res.render("users/login");
	},

	authenticate: passport.authenticate("local", {
		failureRedirect: "/users/login",
		failureFlash: "Failed to login.",
		successRedirect: "/index",
		successFlash: "Logged in!"
	}),

	validate: async (req, res, next) => {
		await check("email").normalizeEmail({
			all_lowercase: true
		}).trim().run(req);
		await check("email", "Email is invalid").isEmail().run(req);
		await check("password", "Password cannot be empty").notEmpty().run(req);

		const error = validationResult(req);
		if (!error.isEmpty()) {
			let messages = error.array().map(e => e.msg);
			req.skip = true;
			req.flash("error", messages.join(" and "));
			res.locals.redirect = "/index";
			next();
		} else {
			next();
		}
	},

	logout: (req, res, next) => {
		req.logout();
		req.flash("success", "You have been logged out!");
		res.locals.redirect = "/";
		next();
	},

	submitDonation: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndUpdate(userId, {
			$inc: { donations: Number(req.body.amount) }
		})
		.then(() => {
			res.locals.redirect = "/users/account";
			next();
		})
		.catch(error => {
			console.log(`Error fetching user by ID: ${error.message}`);
			next(error);
		});
	}
};
