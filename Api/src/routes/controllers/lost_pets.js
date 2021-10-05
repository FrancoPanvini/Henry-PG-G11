const express = require("express");
const router = express.Router();
const getLostPets = require("./services/lost_pets_services/getLostPets");
const postLostPet = require("./services/lost_pets_services/postLostPet");
const {deleteLostPet} = require("./services/lost_pets_services/deleteLostPet");

//ver todos los animales perdidos
router.get("/", getLostPets);

//Ver detalle de una mascota

//Publicar una nueva mascota
router.post("/", postLostPet);

//Modificar una mascota(datos/perdida-encontrada)

//Eliminar una mascota
router.delete("/", deleteLostPet);

module.exports = router;
