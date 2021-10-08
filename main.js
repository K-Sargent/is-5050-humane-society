const port = 3000,
	express = require("express"),
	app = express(),
	homeController = require("./controllers/homecontroller"),
	errorController = require("./controllers/errorController"),
	petController = require("./controllers/petController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	dbconnectionstring = "mongodb+srv://dbAdmin:adminPassword@is-5050-shelter.srhwi.mongodb.net/shelter?retryWrites=true&w=majority";

// DATABASE CONNECTION
mongoose.connect(dbconnectionstring).then(() => {
	console.log("Mongoose connected!")})
		.catch((error) => {
			console.log("Error: ", error);
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

// PAGES
app.get("/", homeController.resHome);
app.get("/index", homeController.resHome);
app.get("/petlist", homeController.resPetlist);
app.get("/about", homeController.resAbout);
app.get("/account", homeController.resAccount);
app.get("/contact-us", homeController.resContactUs);
app.get("/discussions", homeController.resDiscussions);
app.get("/donate", homeController.resDonate);
app.get("/events", homeController.resEvents);
app.get("/news", homeController.resNews);
app.get("/pet", homeController.resPet);
app.get("/questions", homeController.resQuestions);
app.get("/volunteer", homeController.resVolunteer);

// FORMS
app.get("/add-pet", homeController.resAddPet);
app.get("/add-event", homeController.resAddEvent);
app.get("/login", homeController.resLogin);
app.get("/signup", homeController.resSignup);

// POSTS
app.post("/postPet", petController.savePet);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {console.log(`Server running on port ${port}`)});
