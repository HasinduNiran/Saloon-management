import express from 'express';
import { Service } from '../Models/Service.js'; // Assuming the model is named Service
const router = express.Router();
import mongoose from 'mongoose';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage }).single('image');
router.use('/uploads', express.static(join(__dirname, 'uploads')));

// Middleware for validating required fields
const validateFields = (req, res, next) => {
    const requiredFields = [
        "category",
        "description",
        "duration",
        "price",
        "available",
        "subCategory",
        "image"
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
    uploads(req, res,async(err) => {
        try{
            if (err instanceof multer.MulterError) {
                // Multer error occurred
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // Other errors occurred
                return res.status(500).json({ error: err.message });
            }

            const { category, description, duration, price,available, subCategory } = req.body;
            const image = req.file ? req.file.path.replace(/\\/g, '/') : null;
            
        const newService =  new Service ({
            category,
            description,
            duration,
            price,
            available,
            subCategory,
            image
        });
         await newService.save();
         return res.status(201).json({ message: "Service created" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
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

//GET search bar
router.get("searchservice", function (req, res) {
    var search = req.query.search;
    console.log(search);
    Pkg.find({
        $or: [
            
            { service_ID: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
           { duration: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
            { available: { $regex: search, $options: "i"} },
         { subCategory: { $regex: search, $options: "i"} }
           
        ]
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});

export default router;
