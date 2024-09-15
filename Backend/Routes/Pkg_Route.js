import express from 'express';
import { Pkg } from '../Models/Pkg.js';
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
        "package_type",
        "p_name",
        "category",
        "subCategory",
        "services",
        "packages",
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).send({ message: `Field '${field}' cannot be empty` });
        }
    }
    next();
};

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
            package_type: req.body.package_type,
            category: req.body.category,
            p_name: req.body.p_name,
            subCategory: req.body.subCategory,
            services: req.body.services,
            packages: req.body.packages,
        };

        const createdPkg = await Pkg.create(newPackage);
        return res.status(201).send(createdPkg);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route to get all packages
router.get('/', async (req, res) => {
    try {
        const getPackages = await Pkg.find({});
        return res.status(200).json(getPackages);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get a package by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundPackage = await Pkg.findById(id);

        if (!foundPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).json(foundPackage);
    } catch (error) {
        console.log(error.message); // Debugging: Log the error
        res.status(500).send({ message: error.message });
    }
});

// Route to update a package
router.put('/:id', validateFields, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPackage = await Pkg.findByIdAndUpdate(id, req.body, { new: true });

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
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPackage = await Pkg.findByIdAndDelete(id);

        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        return res.status(200).send({ message: 'Package deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//GET search bar
router.get("searchpkg", function (req, res) {
    var search = req.query.search;
    console.log(search);
    Pkg.find({
        $or: [
            
            { ID: { $regex: search, $options: "i" } },
            { p_name: { $regex: search, $options: "i" } },
           { base_price: { $regex: search, $options: "i" } },
            { discount_rate: { $regex: search, $options: "i" } },
            { final_price: { $regex: search, $options: "i"} },
         { start_date: { $regex: search, $options: "i"} },
          { end_date: { $regex: search, $options: "i"} },
            { package_type: { $regex: search, $options: "i"} },
            { category: { $regex: search, $options: "i"} },
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
