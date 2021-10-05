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
