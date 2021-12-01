"use strict";

const userController = require("../controllers/userController");  // use this for checking logged in admin
const router = require("express").Router(),
	petController = require("../controllers/petController");

router.get("", petController.index, petController.indexView);
router.get("/", petController.index, petController.indexView);
router.get("/index", petController.index, petController.indexView);

router.get("/add-pet", userController.checkAdminLoggedIn, petController.new);
router.post("/postPet", userController.checkAdminLoggedIn, petController.create, petController.redirectView);
router.post("/adopt/:petId/:userId", petController.adopt, petController.redirectView);
router.get("/adopted", petController.adopted);
router.get("/:id", petController.details, petController.detailView);

module.exports = router;
