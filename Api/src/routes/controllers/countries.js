const express = require("express");
const router = express.Router();
const getCountries = require('./services/countries_services/getCountries');
const getCountry = require("./services/countries_services/getCountry");



//Traer todos los paises y por query de nombre(includes)

router.get('/', getCountries)


//Traer un pais

router.get("/:id", getCountry)


module.exports = router