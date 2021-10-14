exports.resHome = (req, res) => {
	res.render("index");
};
// exports.resPetlist = (req, res) => {
// 	res.render("petlist");
// };
exports.resAbout = (req, res) => {
	res.render("about/index");
};
exports.resAccount = (req, res) => {
	res.render("users/account");
};
exports.resAddEvent = (req, res) => {
	res.render("events/add-event");
};
exports.resContactUs = (req, res) => {
	res.render("about/contact-us");
};
exports.resDiscussions = (req, res) => {
	res.render("discussions/index");
};
exports.resDonate = (req, res) => {
	res.render("donate");
};
exports.resEvents = (req, res) => {
	res.render("events/index");
};

exports.resLogin = (req, res) => {
	res.render("users/login");
}

exports.resNews = (req, res) => {
	res.render("about/news/index");
}

exports.resPet = (req, res) => {
	res.render("pets/pet");
}

exports.resQuestions = (req, res) => {
	res.render("about/questions");
}

exports.resSignup = (req, res) => {
	res.render("users/signup");
}

exports.resVolunteer = (req, res) => {
	res.render("about/volunteer");
}

// exports.resAddPet = (req, res) => {
// 	res.render("add-pet");
// }
