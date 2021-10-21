const express = require("express");
const router = express.Router();
const getUser = require("./services/users_services/getUser");
const getUsers = require("./services/users_services/getUsers");
const postUser = require("./services/users_services/postUser");
const { deleteUser } = require("./services/users_services/deleteUser");
const putUser = require("./services/users_services/putUser");
const getUserMobile = require("./services/users_services/getUserMobile");

//ver todos los users (con filters)
router.get("/", getUsers);

//Traer un User
router.get("/:id", getUser);

//Traer un User With CityId Lat & Lng
router.get("/mobile/:id", getUserMobile);

//Crear un nuevo user
router.post("/", postUser);

//Modificar un user
router.put("/:id", putUser)

//Eliminar un user
router.delete("/:id", deleteUser);

module.exports = router;
