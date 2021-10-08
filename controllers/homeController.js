exports.resHome = (req, res) => {
	res.render("index");
};
exports.resPetlist = (req, res) => {
	res.render("petlist");
};
exports.resAbout = (req, res) => {
	res.render("about");
};
exports.resAccount = (req, res) => {
	res.render("account");
};
exports.resAddEvent = (req, res) => {
	res.render("add-event");
};
exports.resContactUs = (req, res) => {
	res.render("contact-us");
};
exports.resDiscussions = (req, res) => {
	res.render("discussions");
};
exports.resDonate = (req, res) => {
	res.render("donate");
};
exports.resEvents = (req, res) => {
	res.render("events");
};

exports.resLogin = (req, res) => {
	res.render("login");
}

exports.resNews = (req, res) => {
	res.render("news");
}

exports.resPet = (req, res) => {
	res.render("pet");
}

exports.resQuestions = (req, res) => {
	res.render("questions");
}

exports.resSignup = (req, res) => {
	res.render("signup");
}

exports.resVolunteer = (req, res) => {
	res.render("volunteer");
}

exports.resAddPet = (req, res) => {
	res.render("add-pet");
}
