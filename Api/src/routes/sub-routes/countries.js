const express = require("express");
const router = express.Router();
const getCountries = require('./controllers/countries_controllers/getCountries');
/* const getCountry = require("./controllers/countries_controllers/getCountry"); */



//Traer todos los paises

router.post('/', getCountries)


//Traer un pais

/* router.get("/:id", getCountry) */


module.exports = router