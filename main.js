const port = 3000,
	express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	expressSession = require("express-session"),
	cookieParser = require("cookie-parser"),
	connectFlash = require("connect-flash"),
    expressValidator = require("express-validator"),
    passport = require("passport"),
	homeController = require("./controllers/homecontroller"),
	errorController = require("./controllers/errorController"),
	petController = require("./controllers/petController"),
	userController = require("./controllers/userController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	User = require("./models/user");

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://dbAdmin:adminPassword@is-5050-shelter.srhwi.mongodb.net/shelter?retryWrites=true&w=majority");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// INITIALIZE ROUTER
const router = express.Router();

// MIDDLEWARE
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.use(homeController.logRequestPaths);
app.use("/", router);


// ROUTES
router.get("/", petController.index, homeController.resHome);
router.get("/index", petController.index, homeController.resHome);
router.get("/about", homeController.resAbout);
router.get("/about/contact-us", homeController.resContactUs);
router.get("/discussions", homeController.resDiscussions);
router.get("/donate", homeController.resDonate);
router.get("/events", homeController.resEvents);
router.get("/about/news", homeController.resNews);
router.get("/about/questions", homeController.resQuestions);
router.get("/about/volunteer", homeController.resVolunteer);

// PETS
router.get("/pets", petController.index, petController.indexView);
router.get("/pets/:id", petController.details, petController.detailView);
router.get("/pets/add-pet", petController.new);
router.post("/postPet", petController.create, petController.redirectView);

// USERS
router.post(
	"/users/create",
	userController.validate,
	userController.create,
	userController.redirectView
);
router.get("/users/login", homeController.resLogin);
router.get("/users/signup", homeController.resSignup);
router.post("/users/login/authenticate", userController.authenticate, userController.redirectView);
router.get("/users/logout", userController.logout, userController.redirectView);
router.get("/users/account", homeController.resAccount);
router.get("/submit-donation/:id", userController.submitDonation, userController.redirectView);

// EVENTS
router.get("/events/add-event", homeController.resAddEvent);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {console.log(`Server running on port ${port}`)});
