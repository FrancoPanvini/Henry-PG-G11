const express = require('express');
const router = express.Router();
const postLocations = require('./services/locations_services/postLocations');
const getLocations = require('./services/locations_services/getLocations');

//Post un listado de ciudades, con Provincias y País
router.post('/', postLocations);

//Get un listado de ciudades (con posibilidad de filtrar por País)
router.get('/', getLocations);

module.exports = router;
