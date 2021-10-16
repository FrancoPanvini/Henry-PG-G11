const express = require("express");
const router = express.Router();
const postAdopPets = require("./services/mail_services/postAdopPets");
const getAdopPets = require("./services/mail_services/getAdopPets");

//Enviar correo al publicar mascota en adopcion.
router.post("/", postAdopPets);

//Enviar correo al postularse a una adopcion.
router.post("/", getAdopPets);

module.exports = router;
