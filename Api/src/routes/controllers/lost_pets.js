const express = require("express");
const router = express.Router();
const getLostPets = require("./services/lost_pets_services/getLostPets");

//ver todos los animales perdidos
router.get("/", getLostPets);

//Ver detalle de una mascota

//Publicar una nueva mascota

//Modificar una mascota(datos/perdida-encontrada)

//Eliminar una mascota

module.exports = router;
