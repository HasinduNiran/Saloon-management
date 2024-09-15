import express from 'express';
import mongoose from 'mongoose';
import { Customer } from '../Models/Customer.js';

const router = express.Router();

// Route for Save a new Customer
router.post('/', async (request, response) => {
    try {
        // Check if the email already exists
        const existingCustomer = await Customer.findOne({ Email: request.body.Email });
        if (existingCustomer) {
            return response.status(400).send('Already Registered Customer. Log In');
        }

        const newCustomer = new Customer({
            image: request.body.image,
            CusID: request.body.CusID,  // Generate a unique ID
            FirstName: request.body.FirstName,
            LastName: request.body.LastName,
            Age: request.body.Age,
            Gender: request.body.Gender,
            ContactNo: request.body.ContactNo,
            Email: request.body.Email,
            UserName: request.body.UserName,
            Password: request.body.Password
        });

        const savedCustomer = await newCustomer.save();
        response.send(savedCustomer);
    } catch (error) {
        if (error.code === 11000) {
            response.status(400).send('Duplicate CusID. Please try again.');
        } else {
            response.status(400).send(error);
        }
    }
});



// Route for Fetching all Customers

router.get('/', async (request, response) => {
    try {
        const customers = await Customer.find();
        response.send(customers);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route for Fetching a Single Customer

router.get('/:id', async (request, response) => {
    try {
        const customer = await Customer.findById(request.params.id);

        if (!customer) return response.status(404).send('Customer not found');

        response.send(customer);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route for Updating a Customer

router.patch('/:id', async (request, response) => {
    try {
        const customer = await Customer.findByIdAndUpdate(request.params.id, request.body, {new: true});

        if (!customer) return response.status(404).send('Customer not found');

        response.send(customer);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Route for Deleting a Customer

router.delete('/:id', async (request, response) => {
    try {
        const customer = await Customer.findByIdAndDelete(request.params.id);

        if (!customer) return response.status(404).send('Customer not found');

        response.send(customer);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/cLogin', async (request, response) => {
    try {
        const { CusID, Password } = request.body;
        if (!CusID || !Password) {
            return response.status(400).json({ message: 'CusID and Password are required' });
        }
        const customer = await Customer.findOne({ CusID });
        if (!customer) {
            return response.status(404).json({ message: 'User not found' });
        }
        if (Password !== customer.Password) {
            return response.status(401).json({ message: 'Incorrect Password' });
        }
        response.status(200).json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:Email', async (req, res) => { // view one customer by email
    try {
        const Email = req.params.Email; // Extract email from URL params
        const customer = await Customer.findOne({ Email:Email })

        if (!customer) {
            return res.status(404).json({ message: "customer not found" });
        }

        return res.status(200).json({
            data: customer
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
}); 

export default router;