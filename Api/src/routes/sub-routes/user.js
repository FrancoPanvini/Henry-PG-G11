const express = require('express');
const router = express.Router();
const createUser = require('./controllers/users_controllers/createUser');
const getUser = require('./controllers/users_controllers/getUser');



//Crear un nuevo user

router.post("/", createUser)

//Traer un User

router.get("/:id", getUser)

//Modificar un user



//Eliminar un user



module.exports = router
