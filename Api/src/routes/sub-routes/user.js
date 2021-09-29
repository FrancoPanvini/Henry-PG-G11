const express = require('express');
const router = express.Router();
const postUser = require('./controllers/users_controllers/postUser');
const getUser = require('./controllers/users_controllers/getUser');



//Crear un nuevo user

router.post("/", postUser)

//Traer un User

router.get("/:id", getUser)

//Modificar un user



//Eliminar un user



module.exports = router
