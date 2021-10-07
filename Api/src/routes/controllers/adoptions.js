const express = require("express");
const router = express.Router();
const postAdoption = require("./services/adoptions_services/postAdoption");
const { deleteAdoption } = require("./services/adoptions_services/deleteAdoption");
const getAdoptions = require("./services/adoptions_services/getAdoptions");

//postear un proceso de adopción
router.post("/", postAdoption);

//eliminar un proceso de adopción
router.delete("/:id", deleteAdoption);

//ver form (filter por usuario/animal)
router.get("/", getAdoptions);

//modificar un form (estado: pendiente/aceptado/desestimado)

module.exports = router;
