"use strict";

const Pet = require("../models/pet");

// GET PETLIST
exports.getAllPets = (req, res) => {
  Pet.find({})
    .then(pets => {
      res.render("petlist", {
        pets: pets
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getPetPage = (req, res) => {
  res.render("pet");
};

exports.deletePet = (req, res) => {
  let id = req.params.id;
  Pet.findByIdAndDelete(id)
  	.then(() => {
		console.log("Pet Removed");
		res.redirect("/petlist");
	})
	.catch((error) => {console.log(error)});
};

exports.savePet = (req, res) => {

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

  newPet.save()
    .then(() => {
      res.redirect("/petlist");
    })
    .catch(error => {
      res.send(error);
    });
};
