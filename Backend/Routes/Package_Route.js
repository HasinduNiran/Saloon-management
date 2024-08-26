import express from 'express';
import { Package } from '../Models/Package.js';
import mongoose from 'mongoose';
const router = express.Router();

// Middleware for validating required fields
const validateFields = (req, res, next) => {
    const requiredFields = [
        "description",
        "base_price",
        "discount_rate",
        "final_price",
        "start_date",
        "end_date",
        "conditions",
        "image_url",
        "package_type",
        "service_ID",
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).send({ message: `Field '${field}' cannot be empty` });
        }
    }
    next();
};

// Route for retrieving a specific package by ID
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        let p;
        
        // Check if the identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetch by MongoDB ObjectId
            p = await Package.findById(identifier);
        } else {
            // Fetch by custom string identifier
            p = await Package.findOne({ service_ID: identifier });
        }

        if (p) {
            return res.status(200).json(service);
        } else {
            return res.status(404).send({ message: 'Service not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error fetching service: ' + error.message });
    }
});

// Route to create a new package
router.post('/', validateFields, async (req, res) => {
    try {
        const newPackage = {
            description: req.body.description,
            base_price: req.body.base_price,
            discount_rate: req.body.discount_rate,
            final_price: req.body.final_price,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            conditions: req.body.conditions,
            image_url: req.body.image_url,
            package_type: req.body.package_type,
            service_ID: req.body.service_ID,
        };

        const createdPackage = await Package.create(newPackage);

        return res.status(201).send(createdPackage);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get all packages
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({});
        return res.status(200).json(packages);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get a package by ID
router.get('/:p_ID', async (req, res) => {
    try {
        const { p_ID } = req.params;

        console.log(`Received ID: ${p_ID}`); // Debugging: Log the ID

        if (!mongoose.Types.ObjectId.isValid(p_ID)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const foundPackage = await Package.findById(p_ID);

        if (!foundPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        console.log(`Found Package: ${foundPackage}`); // Debugging: Log the found package

        return res.status(200).json(foundPackage);
    } catch (error) {
        console.log(`Error: ${error.message}`); // Debugging: Log the error
        res.status(500).send({ message: error.message });
    }
});

// Route to update a package
router.put('/:p_ID', validateFields, async (req, res) => {
    try {
        const { p_ID } = req.params;

        const updatedPackage = await Package.findByIdAndUpdate(p_ID, req.body, { new: true });

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).send({ message: 'Package updated successfully', updatedPackage });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to delete a package
router.delete('/:p_ID', async (req, res) => {
    try {
        const { p_ID } = req.params;

        const deletedPackage = await Package.findByIdAndDelete(p_ID);

        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).send({ message: 'Package deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
