const express = require("express");
const router = express.Router();
const getProvinces = require('./services/provinces_services/getProvinces');
const getProvince = require("./services/provinces_services/getProvince");



//Traer todas las provincias y por query de nombre(includes)

router.get('/', getProvinces)

//Traer una provincia

router.get("/:id", getProvince)

module.exports = router