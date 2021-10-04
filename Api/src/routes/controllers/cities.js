const express = require("express");
const router = express.Router();
const getCities = require('./services/cities_controllers/getCities');



//Traer todas las cities en una prov y por query de nombre(includes)

router.get('/', getCities)


module.exports = router