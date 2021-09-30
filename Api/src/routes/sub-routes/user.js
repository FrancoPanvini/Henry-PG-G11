const express = require('express');
const router = express.Router();
const postUser = require('./controllers/users_controllers/postUser');
const getUser = require('./controllers/users_controllers/getUser');
const getUsers = require('./controllers/users_controllers/getUsers');




//Traer todos los users (filtrable por lugar/tipo de usuario)

router.get("/all", getUsers)

//Crear un nuevo user

router.post("/", postUser)

//Traer un User

router.get("/:id", getUser)




//Modificar un user



//Eliminar un user



module.exports = router
