
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');

/*
    Rutas de Eventos / Events
    host + /api/events
*/
router.use( validarJWT );

router.get( '/', getEvents );

router.post(
    '/',
    [ 
        check('title', 'El Título es obligatorio').not().isEmpty(),
        check('start', 'La Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La Fecha de finalización es obligatorio').custom( isDate ),
        validarCampos
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;