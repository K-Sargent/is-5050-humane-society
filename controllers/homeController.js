module.exports = {
  	logRequestPaths: (req, res, next) => {
	    console.log(`request made to: ${req.url}\nrequest body: ${JSON.stringify(req.body)}`);
	    next();
	},
	resHome: (req, res) => {
		res.render("index");
	},
	resAbout: (req, res) => {
		res.render("about/index");
	},
	resContactUs: (req, res) => {
		res.render("about/contact-us");
	},
	resThanks: (req, res) => {
		res.render("contact-thanks");
	},
	submitContact: (req, res) => {
		res.redirect("contact-thanks");
	},
	resDonate: (req, res) => {
		res.render("donate");
	},
	resVolunteer: (req, res) => {
		res.render("about/volunteer");
	}
};
