const express = require("express");
const router = express.Router();
const getUser = require("./services/users_services/getUser");
const getUsers = require("./services/users_services/getUsers");
const postUser = require("./services/users_services/postUser");
const { deleteUser } = require("./services/users_services/deleteUser");

//ver todos los users (con filters)
router.get("/", getUsers);

//Traer un User
router.get("/:id", getUser);

//Crear un nuevo user
router.post("/", postUser);

//Modificar un user

//Eliminar un user
router.delete("/:id", deleteUser);

module.exports = router;
