import express from 'express';
import { Service } from '../Models/Service.js'; // Assuming the model is named Service
const router = express.Router();
import mongoose from 'mongoose';


// Middleware for validating required fields
const validateFields = (req, res, next) => {
    const requiredFields = [
        "category",
        "description",
        "duration",
        "price",
        "available",
        "subCategory"
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).send({ message: `Field '${field}' cannot be empty` });
        }
    }
    next();
};

 
// Route to create a new service
router.post('/', validateFields, async (req, res) => {
    try {
        const newService = {
            category: req.body.category,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,
            available: req.body.available,
            subCategory:req.body.subCategory
        };

        const createdService = await Service.create(newService);

        return res.status(201).send(createdService);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        return res.status(200).json(services);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get a service by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundService = await Service.findById(id);

        if (!foundService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.status(200).json(foundService);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to update a service
router.put('/:id', validateFields, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.status(200).send({ message: 'Service updated successfully', updatedService });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to delete a service
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.status(200).send({ message: 'Service deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
