const express = require("express");
const router = express.Router();
const postAdopPets = require('./services/mail_services/postAdopPets')
const getPets = require('./services/pets_services/getPets')

//Enviar mascota en adopcion publicada
router.post("/", getPets); 

module.export = router;