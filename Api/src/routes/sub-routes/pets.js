const express = require("express");
const router = express.Router();
const getPets = require("./controllers/pets_controllers/getPets");
// const postPet = require("./controllers/pets_controllers/postPet");


//ver todos los animales (con filters)
router.get("/", getPets);

//Ver detalle de una mascota

//Post una nueva mascota
// router.get("/all", postPet);

//Modificar una mascota

//Eliminar una mascota

module.exports = router;
