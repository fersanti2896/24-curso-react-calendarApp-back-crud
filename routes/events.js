
const { Router } = require('express');
const router = Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validarJWT');

/*
    Rutas de Eventos / Events
    host + /api/events
*/

router.get('/', validarJWT, getEvents);

router.post('/', validarJWT, createEvent);

router.put('/:id', validarJWT, updateEvent);

router.delete('/:id', validarJWT, deleteEvent);

module.exports = router;