"use strict";
const {check, validationResult} = require("express-validator");
const stripe = require('stripe')('sk_test_51K4s8wFA32Our4rGnBuMj6IdR9hXdSutDTMbUwGpU7MlzPgK6eCdoJx8XkbXLDV48juo6dcde64hhN1jf3IhUCb500SPNl1H9R');
const User = require("../models/user"),
passport = require("passport"),
getUserParams = body => {
	return {
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		donations: 0,
		admin: false
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

	// Different sized donations
	// or different quantity amount
	//
	//
	// see lab in class exercise 1 for extra help
	stripeDonation: async (req, res, next) => {
		let stripeLineItems = [];
		stripeLineItems.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: "donation"
				},
				unit_amount: 100,  // in cents, so this is 1 dollar
			},
			quantity: 1,
		});

		const stripseSession = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],  // Credit card payments accepted
            client_reference_id: "donation string",  // Store the local orderId on Stripe as a reference
            customer_email: req.user.email,  // Store user email
            line_items: stripeLineItems,  // Order line items
            mode: 'payment',  // One-time payment
            success_url: `${req.headers.origin}/users/account`, // Redirect Url for success.  Pass sessionID in querystring
            cancel_url: `${req.headers.origin}/index`, // Redirect Url for cancel
		});

		res.json({ id: stripeSession.id });
	},

	submitDonation: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndUpdate(userId, {
			$inc: { donations: Number(req.body.amount) }
		})
		.then(() => {
			//res.locals.redirect = "/users/account";
			next();
		})
		.catch(error => {
			console.log(`Error fetching user by ID: ${error.message}`);
			next(error);
		});
	},

	checkAdminLoggedIn: (req, res, next) => {
		let auth = req.isAuthenticated();
		if (req.isAuthenticated()) {
			if (req.user.admin) {
				// user is logged in and is admin
				next();
			} else {
				// user is logged in and not an admin
				res.redirect("/index");
			}
		} else {
			// user is not logged in
			res.redirect("/users/login");
		}
	},
	checkLoggedIn: (req, res, next) => {
		let auth = req.isAuthenticated();
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect("/users/login");
		}
	},
};
