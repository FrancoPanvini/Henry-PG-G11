const express = require("express");
const router = express.Router();
const getUser = require("./controllers/users_services/getUser");
const getUsers = require("./controllers/users_services/getUsers");
const postUser = require("./controllers/users_services/postUser");
const { deleteUser } = require("./controllers/users_services/deleteUser");

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
