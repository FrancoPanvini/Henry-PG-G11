const express = require('express');
const router = express.Router();
const getPets = require('./services/pets_services/getPets');
const getPetDetail = require('./services/pets_services/getPetDetail');
const postPet = require('./services/pets_services/postPet');
const putPet = require('./services/pets_services/putPet');
const { deletePet } = require('./services/pets_services/deletePet');

//ver todos los animales (con filters)
router.get('/', getPets);

//Ver detalle de una mascota
router.get('/:id', getPetDetail);

//Post una nueva mascota
router.post('/', postPet);

//Modificar una mascota
router.put('/:id', putPet);

//Eliminar una mascota
router.delete('/:id', deletePet);

module.exports = router;
