
const { response } = require('express');
const EventoModel = require('../models/EventoModel');

const getEvents = async( req, res = response ) => {
    const events = await EventoModel.find()
                                    .populate('user', 'name');

    res.status(201).json({
        ok: true,
        msg: events
    });
}

const createEvent = async( req, res = response ) => {
    const event = new EventoModel( req.body );

    try {
        event.user = req.uid
        const eventSave = await event.save();

        res.status(201).json({
            ok: true,
            eventSave
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const updateEvent = async( req, res = response ) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await EventoModel.findById(eventId);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id.'
            }); 
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegio de editar este evento.'
            });
        }

        const newEvent = {
            ...req.body, 
            user: uid
        }

        const eventUpdate = await EventoModel.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status(201).json({
            ok: true,
            event: eventUpdate
        });        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const deleteEvent = ( req, res = response ) => {
    res.status(201).json({
        ok: true,
        msg: 'deleteEvent'
    });
}

module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent   
}