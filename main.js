const port = 3000,
	express = require("express"),
	app = express(),
	homeController = require("./controllers/homecontroller"),
	layouts = require("express-ejs-layouts"),
	errorController = require("./controllers/errorController");

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.resHome);
app.get("/index", homeController.resHome);
app.get("/petlist", homeController.resPetlist);
app.get("/about", homeController.resAbout);
app.get("/account", homeController.resAccount);
app.get("/add-event", homeController.resAddEvent);
app.get("/contact-us", homeController.resContactUs);
app.get("/discussions", homeController.resDiscussions);
app.get("/donate", homeController.resDonate);
app.get("/events", homeController.resEvents);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.listen(port, () => {console.log(`Server running on port ${port}`)});
