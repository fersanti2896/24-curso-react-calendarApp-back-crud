
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

const updateEvent = ( req, res = response ) => {
    res.status(201).json({
        ok: true,
        msg: 'updateEvent'
    });
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