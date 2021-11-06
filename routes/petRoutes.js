"use strict";

const router = require("express").Router(),
	petController = require("../controllers/petController");

router.get("", petController.index, petController.indexView);
router.get("/", petController.index, petController.indexView);
router.get("/index", petController.index, petController.indexView);

router.get("/:id", petController.details, petController.detailView);
router.get("/add-pet", petController.new);
router.post("/postPet", petController.create, petController.redirectView);

module.exports = router;
