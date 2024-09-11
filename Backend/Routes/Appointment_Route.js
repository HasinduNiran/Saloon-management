import express from 'express';
import { Appointment } from '../Models/Appointment.js';
import mongoose from 'mongoose';

const router = express.Router();

// Middleware for validating required fields
const validateFields = (req, res, next) => {
    const requiredFields = [
        "client_name",
        "client_email",
        "client_phone",
        "stylist",
        "service",
        "customize_package",
        "appoi_date",
        "appoi_time"
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).send({ message: `Field '${field}' cannot be empty` });
        }
    }
    next();
};

// Route to create a new appointment
router.post('/', validateFields, async (req, res) => {
    try {
        const newAppointment = {
            client_name: req.body.client_name,
            client_email: req.body.client_email,
            client_phone: req.body.client_phone,
            stylist: req.body.stylist,
            service: req.body.service,
            customize_package: req.body.customize_package,
            appoi_date: req.body.appoi_date,
            appoi_time: req.body.appoi_time,
        };

        const createdAppointment = await Appointment.create(newAppointment);
        return res.status(201).send(createdAppointment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        return res.status(200).json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get a specific appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
});

// Route to update an appointment by ID
router.put('/:id', validateFields, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(request.params.id, request.body, {new: true});

        if (!appointment) return response.status(404).send('Appointment not found');

        response.send(appointment);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Route to delete an appointment by ID
router.delete('/:id', async (request, response) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(request.params.id);

        if (!appointment) return response.status(404).send('Appointment not found');

        response.send(appointment);
    } catch (error) {
        response.status(500).send(error);
    }
});

export default router;
