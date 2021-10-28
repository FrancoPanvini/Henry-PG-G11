const express = require('express');
const router = express.Router();
const postAdoption = require('./services/adoptions_services/postAdoption');
const { deleteAdoption } = require('./services/adoptions_services/deleteAdoption');
const getAdoptions = require('./services/adoptions_services/getAdoptions');
const putAcceptAdoption = require('./services/adoptions_services/putAcceptAdoption');

//ver procesos de adopción con filtros
router.get('/', getAdoptions);

//postear un proceso de adopción
router.post('/', postAdoption);

//aceptar un proceso de adopción
router.put('/adopt/:id', putAcceptAdoption);

//eliminar un proceso de adopción
router.delete('/:id', deleteAdoption);

module.exports = router;
