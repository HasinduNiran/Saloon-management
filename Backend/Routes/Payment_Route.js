import express from 'express';
import mongoose from 'mongoose';
import { Payment } from '../Models/Payment.js';


const router = express.Router();

// Route for saving a new Payment
router.post('/', async (req, res) => {
    console.log("Request body:", req.body); // Log the incoming request body
    try {
      const newPayment = new Payment(req.body);
      const savedPayment = await newPayment.save();
      res.status(201).send(savedPayment);
    } catch (error) {
      console.error("Error saving payment:", error); // Log the error
      if (error.code === 11000) {
        res.status(400).send('Duplicate card number');
      } else {
        res.status(400).send(error.message);
      }
    }
  });
  

// Route for Get All Payments from database
router.get('/', async (request, response) => {
    try {
        const payments = await Payment.find({});
        response.json(payments);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// // Route for Get One Payment from database by id or CusID
// router.get('/:identifier', async (request, response) => {
//     try {
//         const { identifier } = request.params;

//         if (mongoose.Types.ObjectId.isValid(identifier)) {
//             const paymentByID = await Payment.findById(identifier);
//             if (paymentByID) {
//                 return response.status(200).json(paymentByID);
//             }
//         }

//         const paymentByCUSID = await Payment.findOne({ CusID: identifier });
//         if (paymentByCUSID) {
//             return response.status(200).json(paymentByCUSID);
//         }

//         return response.status(404).json({ message: 'Payment not found' });
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: 'Error fetching payment: ' + error.message });
//     }
// });

// // Route for updating a Payment
// router.put('/:id', async (request, response) => {
//     try {
//         if (
//             !request.body.CusID ||
//             !request.body.PaymentDate ||
//             !request.body.PackageAmount ||
//             !request.body.TotalAmount ||
//             !request.body.Method
//         ) {
//             return response.status(400).send({
//                 message: 'Send all required fields: CusID, PaymentDate, PackageAmount, TotalAmount, Method',
//             });
//         }

//         const { id } = request.params;
//         const result = await Payment.findByIdAndUpdate(id, request.body, { new: true });

//         if (!result) {
//             return response.status(404).json({ message: 'Payment not found' });
//         }

//         return response.status(200).send(result);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// // Route for delete
// router.delete('/:id', async (request, response) => {
//     try {
//       const { id } = request.params;
//       const result = await Payment.findByIdAndDelete(id);
//       if (!result) {
//         return response.status(404).json({ message: 'Payment not found' });
//       }
//       return response.status(200).send({ message: "Payment deleted successfully" });
//     } catch (error) {
//       console.log(error.message);
//       response.status(500).send({ message: error.message });
//     }
//   });
  



export default router;
