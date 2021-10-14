const port = 3000,
	express = require("express"),
	app = express(),
	homeController = require("./controllers/homecontroller"),
	errorController = require("./controllers/errorController"),
	petController = require("./controllers/petController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	dbconnectionstring = "mongodb+srv://dbAdmin:adminPassword@is-5050-shelter.srhwi.mongodb.net/shelter?retryWrites=true&w=majority";

const db = mongoose.connection;
const router = express.Router();
const methodOverride = require("method-override");

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

// DATABASE CONNECTION
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.use(homeController.logRequestPaths);
app.use("/", router);

// PAGES
router.get("/", homeController.resHome);
router.get("/index", homeController.resHome);
router.get("/pets", petController.indexView);
router.get("/about", homeController.resAbout);
router.get("/users/account", homeController.resAccount);
router.get("/about/contact-us", homeController.resContactUs);
router.get("/discussions", homeController.resDiscussions);
router.get("/donate", homeController.resDonate);
router.get("/events", homeController.resEvents);
router.get("/about/news", homeController.resNews);
router.get("/pets/pet", petController.details, petController.detailView);
router.get("/about/questions", homeController.resQuestions);
router.get("/about/volunteer", homeController.resVolunteer);

// FORMS
router.get("/pets/add-pet", petController.new);
router.get("/events/add-event", homeController.resAddEvent);
router.get("/users/login", homeController.resLogin);
router.get("/users/signup", homeController.resSignup);

// POSTS
router.post("/postPet", petController.savePet, petController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {console.log(`Server running on port ${port}`)});
