const express = require("express"),
	app = express(),
	router = require("./routes/index"),
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
	eventController = require("./controllers/eventController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	User = require("./models/user");

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://dbAdmin:adminPassword@is-5050-shelter.srhwi.mongodb.net/shelter?retryWrites=true&w=majority", {useNewUrlParser: true})

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// MIDDLEWARE
app.use(methodOverride("_method", {
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

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${app.get("port")}`);
});
