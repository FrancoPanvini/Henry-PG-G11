const express = require("express");
const router = express.Router();
const getLostPets = require("./services/lost_pets_services/getLostPets");
const postLostPet = require("./services/lost_pets_services/postLostPet");
const {deleteLostPet} = require("./services/lost_pets_services/deleteLostPet");
const getLostPetDetail = require("./services/lost_pets_services/getLostPetDetail");
const putFoundLostPet = require("./services/lost_pets_services/putFoundLostPet");
const putLostPet = require("./services/lost_pets_services/putLostPet");

//ver todos los animales perdidos
router.get("/", getLostPets);

//Ver detalle de una mascota
router.get("/:id", getLostPetDetail)

//Publicar una nueva mascota
router.post("/", postLostPet);

//Modificar una mascota(datos)
router.put("/:id", putLostPet);

//Modificar una mascota(marcar como encontrada)
router.put("/found/:id", putFoundLostPet);

//Eliminar una mascota
router.delete("/:id", deleteLostPet);

module.exports = router;
