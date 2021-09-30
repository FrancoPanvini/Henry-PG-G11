const express = require("express");
const router = express.Router();
const getPets = require("./controllers/pets_controllers/getPets");
const postPet = require("./controllers/pets_controllers/postPets");


//ver todos los animales (con filters)
router.get("/", getPets);

//Ver detalle de una mascota

//Post una nueva mascota
 router.post("/", postPet);

//Modificar una mascota

//Eliminar una mascota

module.exports = router;
