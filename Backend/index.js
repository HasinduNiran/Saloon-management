
// Importing necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

// Importing custom configurations
import { PORT, mongoDBURL } from './config.js';

// Importing routes
//import Inventory_Route from './Routes/Inventory_Route.js';
import Employee_Route from './Routes/Employee_Route.js';

import Appointment_Route from './Routes/Appointment_Route.js';
import Package_Route from './Routes/Package_Route.js';
import Service_Route from './Routes/Service_Route.js';

import Customer_Route from './Routes/Customer_Route.js';
import Payment_Route from './Routes/Payment_Route.js';
import Supplier_Route from './Routes/Supplier_Route.js';
import Inventory_Route from './Routes/Inventory_Route.js';
import Feedback_Route from './Routes/Feedback_Route.js';
import Store_Route from './Routes/Store_Route.js';





// Creating an instance of the Express application
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());


// Using routes for endpoints

//app.use('/inventory', Inventory_Route);
app.use('/employees', Employee_Route);

app.use('/packages', Package_Route);
app.use('/services', Service_Route);
app.use('/appointments', Appointment_Route);

app.use('/suppliers', Supplier_Route);
app.use('/inventories', Inventory_Route);
app.use('/customers', Customer_Route);
app.use('/payments', Payment_Route);
app.use('/store',Store_Route);


app.use('/feedback', Feedback_Route);






// Connecting to the MongoDB database
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });