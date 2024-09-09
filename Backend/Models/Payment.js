import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    Amount: {
        type: String,
        unique: true
    },
    Cardno: {
        type: String,
        unique: true
    },
    Exp: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    }
});



export const Payment = mongoose.model('Payment', paymentSchema);
