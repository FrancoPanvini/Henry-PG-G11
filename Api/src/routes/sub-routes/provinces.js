const express = require("express");
const router = express.Router();
const getProvinces = require('./controllers/provinces_controllers/getProvinces');
const getProvince = require("./controllers/provinces_controllers/getProvince");



//Traer todas las provincias y por query de nombre(includes)

router.get('/', getProvinces)

//Traer una provincia

router.get("/:id", getProvince)

module.exports = router