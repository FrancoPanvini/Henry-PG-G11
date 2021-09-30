const express = require('express');
const router = express.Router();
const getEvents = require('./controllers/events_controllers/getEvents');
const postEvents = require ('./controllers/events_controllers/postEvents')
const getEventById = require ('./controllers/events_controllers/getEventbyId')


//mostrar todos los eventos (con filters)

router.get("/all", getEvents)

//mostrar 1 evento

router.get("/:id", getEventById)

//crear eventos

router.post("/all", postEvents )

//modificar evento

router.patch("/events/:idEvent", )

//eliminar evento

router.delete("/events/:idEvent", )



module.exports = router
