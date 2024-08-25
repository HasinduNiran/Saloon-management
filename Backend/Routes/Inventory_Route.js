import express from 'express';
import { Inventory } from '../Models/Inventory.js';

const router = express.Router();

// Route for Save a new Inventory
router.post('/', async (request, response) => {
  try {
    if (
      
      !request.body.ItemName ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.Price ||
      !request.body.SupplierName ||
      !request.body.SupplierEmail

    ) {
      return response.status(400).send({
        message: 'Send all required fields:  ItemName, Category, Quantity, Price, SupplierName, SupplierEmail',
      });
    }
    const newInventory = {
      
      ItemName: request.body.ItemName,
      Category: request.body.Category,
      Quantity: request.body.Quantity,
      Price: request.body.Price,
      SupplierName: request.body.SupplierName,
      SupplierEmail: request.body.SupplierEmail,
    };

    const inventory = await Inventory.create(newInventory);

    return response.status(201).send(inventory);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Inventory from database
router.get('/', async (request, response) => {
  try {
    const inventories = await Inventory.find({});
    const formattedInventory = inventories.map(inventory => ({
      ItemNo: inventory.ItemNo,
      ItemName: inventory.ItemName,
      Category: inventory.Category,
      Quantity: inventory.Quantity,
      Price: inventory.Price,
      SupplierName: inventory.SupplierName,
      SupplierEmail: inventory.SupplierEmail,
    }));
    
    return response.status(200).json({
      count: formattedInventory.length,
      data: formattedInventory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get One Inventory from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const inventory = await Inventory.findById(id);

    return response.status(200).json(inventory);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an Inventory
router.put('/:id', async (request, response) => {
  try {
    if (
      
      !request.body.ItemName ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.Price ||
      !request.body.SupplierName ||
      !request.body.SupplierEmail 

    ) {
      return response.status(400).send({
        message: 'Send all required fields: ItemNo, ItemName, Category, Quantity, Price, SupplierName, SupplierEmail',
      });
    }

    const { id } = request.params;

    const result = await Inventory.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Inventory not found' });
    }

    return response.status(200).send({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an Inventory
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Inventory.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Inventory not found' });
    }

    return response.status(200).send({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving Inventory based on search criteria, pagination, and sorting
router.get("/searchInventory", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 7, search = "", sort = "ItemNo" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { ItemNo: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { ItemName: { $regex: new RegExp(search, 'i') } },
        { Category: { $regex: new RegExp(search, 'i') } },
        { Quantity: { $regex: new RegExp(search, 'i') } },
        { Price: { $regex: new RegExp(search, 'i') } },
        { SupplierName: { $regex: new RegExp(search, 'i') } },
        { SupplierEmail: { $regex: new RegExp(search, 'i') } },
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const inventory = await Inventory.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: inventory.length, data: inventory });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


export default router;