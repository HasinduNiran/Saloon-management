import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    Amount: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true,
    },
    Cardno: {
        type: String,
        unique: true
    },
    expMonth: {
        type: String,
        required: true,
    },
    expYear: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    }
});



export const Payment = mongoose.model('Payment', paymentSchema);
