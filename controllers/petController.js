"use strict";

const Pet = require("../models/pet");

module.exports = {
	index: (req, res, next) => {
		let sortParam = req.query.sortby || "dateAdded";
		Pet.find(req.query).sort(sortParam).then(pets => {
			res.locals.pets = pets;
			next();
		}).catch(error => {
			console.log(`Error fetching pets: ${error.message}`);
			next(error);
		});
	},

	indexView: (req, res) => {
		res.render("pets/index");
	},

	getAllPets: (req, res) => {
		Pet.find({}).then(pets => {
			res.render("pets/index", {
				pets: pets
			});
		}).catch(error => {
			console.log(error.message);
			return [];
		}).then(() => {
			console.log("promise complete");
		});
	},

	new: (req, res) => {
		res.render("pets/add-pet");
	},

	savePet: (req, res) => {
		let newPet = new Pet({
			name: req.body.name,
			species: req.body.species,
			breed: req.body.breed,
			age: req.body.age,
			gender: req.body.gender,
			weight: req.body.weight,
			price: req.body.price,
			dateAdded: new Date(),
			description: req.body.description,
			houseTrained: req.body.houseTrained,
			image: req.body.image
		});
		newPet.save().then(result => {
			console.log("pet saved");
			res.redirect("/pets");
		}).catch(error => {
			if (error) res.send(error);
		});
    },

	create: (req, res, next) => {
		let petParams = {
			name: req.body.name,
		  	species: req.body.species,
		  	breed: req.body.breed,
		  	age: req.body.age,
		  	gender: req.body.gender,
		  	weight: req.body.weight,
		  	price: req.body.price,
		  	dateAdded: new Date(),
		  	description: req.body.description,
		  	houseTrained: req.body.houseTrained,
		  	image: req.body.image
		};

		Pet.create(petParams).then(pet => {
			res.locals.redirect = "/pets";
			res.locals.pet = pet;
			next();
		}).catch(error => {
			console.log(`Error saving pet: ${error.message}`);
			next(error);
		});
	},

	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
  	},

	details: (req, res, next) => {
		let petId = req.params.id;
		Pet.findById(petId).then(pet => {
			res.locals.pet = pet;
			next();
		}).catch(error => {
			console.log(`Error fetching pet by ID: ${error.message}`);
			next(error);
		});
	},

	detailView: (req, res) => {
		res.render("pets/pet");
	},

	edit: (req, res, next) => {
		let petId = req.params.id;
		Pet.findById(petId).then(pet => {
			res.render("pets/edit", {
				pet: pet
			});
		}).catch(error => {
			console.log(`Error fetching pet by ID: ${error.message}`);
			next(error);
		});
	},

	update: (req, res, next) => {
		let petId = req.params.id,
		petParams = {
			name: req.body.name,
			species: req.body.species,
			breed: req.body.breed,
			age: req.body.age,
			gender: req.body.gender,
			weight: req.body.weight,
			price: req.body.price,
			dateAdded: req.body.date,
			description: req.body.description,
			houseTrained: req.body.houseTrained,
			image: req.body.image
		};

		Pet.findByIdAndUpdate(petId, {
			$set: petParams
		}).then(pet => {
			res.locals.redirect = `/pets/${petId}`;
			res.locals.pet = pet;
			next();
		}).catch(error => {
			console.log(`Error updating pet by ID: ${error.message}`);
			next(error);
		});
	},

	delete: (req, res, next) => {
		let petId = req.params.id;
		Pet.findByIdAndDelete(petId).then(() => {
			res.locals.redirect = "/pets";
			next();
		}).catch(error => {
			console.log(`Error deleting pet by ID: ${error.message}`);
			next();
		});
	}

	// TODO: image upload function
};
