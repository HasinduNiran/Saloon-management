import express from 'express';
import mongoose from 'mongoose';
import { Store } from '../Models/Store.js';


const router = express.Router();

// Route for Save a new Store

router.post('/', async (req, res) => {
    const store = new Store(req.body);
    try {
        await store.save();
        res.status(201).send(store);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route for Get all Stores

router.get('/', async (req, res) => {
    try {
        const stores = await Store.find({});
        res.send(stores);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for Get one Store

router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if (!store) return res.status(404).send('Store not found');

        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for Update a Store

router.put('/:id', async (request, response) => {
    try {
      if (
        
        !request.body.ItemNo ||
        !request.body.ItemName ||
        !request.body.Description ||
        !request.body.Quantity ||
        !request.body.cost ||
        !request.body.SPrice 
  
      ) {
        return response.status(400).send({
          message: 'Send all required fields: ItemNo, ItemName, Category, Quantity, Price, SupplierName, SupplierEmail',
        });
      }
  
      const { id } = request.params;
  
      const result = await Store.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'item not found' });
      }
  
      return response.status(200).send({ message: 'item updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

// Route for Delete a Store

router.delete('/:id', async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);

        if (!store) return res.status(404).send('item not found');

        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;