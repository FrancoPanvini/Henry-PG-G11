const express = require('express');
const router = express.Router();
const postAdopPets = require('./services/mail_services/postAdopPets');
const postLostPets = require('./services/mail_services/postLostPets');
const postRegister = require('./services/mail_services/postRegister');
const postEvent = require('./services/mail_services/postEvent');

//Enviar correo al publicar mascota en adopcion.
router.post('/postadop', postAdopPets);

//Enviar correo al postularse a una adopcion.
router.post('/postlost', postLostPets);

//Enviar correo de registro
router.post('/postregister', postRegister);

//Enviar correo al crear un evento
router.post('/postevent', postEvent);

module.exports = router;
