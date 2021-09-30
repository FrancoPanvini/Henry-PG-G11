const express = require("express");
const router = express.Router();
const getPets = require("./controllers/pets_controllers/getPets");
const postPet = require("./controllers/pets_controllers/postPet");
const putPet = require("./controllers/pets_controllers/putPet");
const {deletePet} = require("./controllers/pets_controllers/deletePet");


//ver todos los animales (con filters)
router.get("/", getPets);

//Ver detalle de una mascota

//Post una nueva mascota
 router.post("/", postPet);

//Modificar una mascota
router.put('/:id',putPet)

//Eliminar una mascota
router.delete("/:id", deletePet);

module.exports = router;
