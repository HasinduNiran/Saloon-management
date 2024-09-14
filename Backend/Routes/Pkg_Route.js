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

// Route to get all packages or search packages
router.get("/searchPackage", async (req, res) => {
    try {
      // Destructuring the request query with default values
      const { page = 1, limit = 7, search = "", sort = "ID" } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      // Regular expression for case-insensitive search
      const query = {
        $or: [
          { ID: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
          { p_name: { $regex: new RegExp(search, 'i') } },
          { base_price: { $regex: new RegExp(search, 'i') } },
          { discount_rate: { $regex: new RegExp(search, 'i') } },
          { Gender: { $regex: new RegExp(search, 'i') } },
          { category: { $regex: new RegExp(search, 'i') } },
          { final_price: { $regex: new RegExp(search, 'i') } },
          { package_type: { $regex: new RegExp(search, 'i') } },
          { subCategory: { $regex: new RegExp(search, 'i') } },
        ],
      };
      // Using await to ensure that sorting and pagination are applied correctly
      const pkgs = await Pkg.find(query)
        .sort({ [sort]: 1 }) // Sorting based on the specified field
        .skip(skip)
        .limit(parseInt(limit));
      res.status(200).json({ count: pkgs.length, data: pkgs });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
  


export default router;
