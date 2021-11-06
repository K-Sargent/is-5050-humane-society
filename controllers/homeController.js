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


	resAddEvent: (req, res) => {
		res.render("events/add-event");
	},

	resContactUs: (req, res) => {
		res.render("about/contact-us");
	},

	resDiscussions: (req, res) => {
		res.render("discussions/index");
	},

	resDonate: (req, res) => {
		res.render("donate");
	},

	resEvents: (req, res) => {
		res.render("events/index");
	},



	resNews: (req, res) => {
		res.render("about/news/index");
	},

	resQuestions: (req, res) => {
		res.render("about/questions");
	},



	resVolunteer: (req, res) => {
		res.render("about/volunteer");
	}
};
