const express = require("express");
const router = express.Router();
const getPets = require("./controllers/pets_controllers/getPets");


//ver todos los animales (con filters)

router.get("/all", getPets);

//Ver detalle de una mascota

//Publicar una nueva mascota

//Modificar una mascota

//Eliminar una mascota

module.exports = router;
