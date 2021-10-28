const express = require('express');
const router = express.Router();
const getEvents = require('./services/events_services/getEvents');
const getEventById = require('./services/events_services/getEventbyId');
const postEvent = require('./services/events_services/postEvent');
const putEvent = require('./services/events_services/putEvent');
const { deleteEvent } = require('./services/events_services/deleteEvent');

//mostrar todos los eventos (con filters)
router.get('/', getEvents);

//mostrar 1 evento
router.get('/:id', getEventById);

//crear eventos
router.post('/', postEvent);

//modificar evento
router.put('/:id', putEvent);

//eliminar evento
router.delete('/:id', deleteEvent);

module.exports = router;
