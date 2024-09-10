import express from 'express';
import mongoose from 'mongoose';
import { Card } from '../Models/Card.js';


const router = express.Router();

// Route for saving a new Card
router.post('/', async (req, res) => {
    console.log("Request body:", req.body); // Log the incoming request body
    try {
      const newCard = new Card(req.body);
      const savedCard = await newCard.save();
      res.status(201).send(savedCard);
    } catch (error) {
      console.error("Error saving Card:", error); // Log the error
      if (error.code === 11000) {
        res.status(400).send('Duplicate card number');
      } else {
        res.status(400).send(error.message);
      }
    }
  });
  

// Route for Get All Cards from database
router.get('/', async (request, response) => {
    try {
        const Cards = await Card.find({});
        response.json(Cards);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

export default router;