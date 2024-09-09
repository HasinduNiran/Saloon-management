import express from 'express';
import {Customer} from '../Models/Customer.js';
import { v4 as uuidv4 } from 'uuid'; 

const router = express.Router();

// Route for Save a new Customer

router.post('/', async (request, response) => {
    try {
        const newCustomer = new Customer({
            CusID: uuidv4(),  // Generate a unique ID
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

export default router;