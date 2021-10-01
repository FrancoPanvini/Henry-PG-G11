const express = require("express");
const router = express.Router();
const getEvents = require("./controllers/events_controllers/getEvents");
const getEventById = require("./controllers/events_controllers/getEventbyId");
const postEvent = require("./controllers/events_controllers/postEvent");
const putEvent = require("./controllers/events_controllers/putEvent");
const { deleteEvent } = require("./controllers/events_controllers/deleteEvent");

//mostrar todos los eventos (con filters)
router.get("/", getEvents);

//mostrar 1 evento
router.get("/:id", getEventById);

//crear eventos
router.post("/", postEvent);

//modificar evento
router.put("/:id", putEvent);

//eliminar evento
router.delete("/:id", deleteEvent);

module.exports = router;
