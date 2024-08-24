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
router.get('/:appoi_ID', async (req, res) => {
    try {
        const { appoi_ID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appoi_ID)) {
            return res.status(400).json({ message: 'Invalid appointment ID format' });
        }

        const foundAppointment = await Appointment.findById(appoi_ID);

        if (!foundAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json(foundAppointment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to update an appointment by ID
router.put('/:appoi_ID', validateFields, async (req, res) => {
    try {
        const { appoi_ID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appoi_ID)) {
            return res.status(400).json({ message: 'Invalid appointment ID format' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(appoi_ID, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).send({ message: 'Appointment updated successfully', updatedAppointment });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to delete an appointment by ID
router.delete('/:appoi_ID', async (req, res) => {
    try {
        const { appoi_ID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appoi_ID)) {
            return res.status(400).json({ message: 'Invalid appointment ID format' });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(appoi_ID);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).send({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
