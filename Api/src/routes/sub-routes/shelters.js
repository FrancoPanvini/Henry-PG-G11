const express = require('express');
const router = express.Router();
const getAllShelters = require('./controllers/shelter_controllers/getAllShelters');
const getShelter = require('./controllers/shelter_controllers/getShelter');


//ver todos los shelters (con filters)

router.get("/all", getAllShelters)

//Ver detalle de un shelter

router.get("/:id", getShelter)


module.exports = router
