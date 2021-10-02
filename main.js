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

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.listen(port, () => {console.log(`Server running on port ${port}`)});
