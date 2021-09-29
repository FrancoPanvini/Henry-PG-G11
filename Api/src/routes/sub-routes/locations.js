const express = require("express");
const router = express.Router();
const postLocations = require("./controllers/locations_controllers/postLocations");
const getLocations = require("./controllers/locations_controllers/getLocations");

//Post un listado de ciudades, con Provincias y País
router.post("/", postLocations);

//Get un listado de ciudades (con posibilidad de filtrar por País)
router.get("/", getLocations);

module.exports = router;
