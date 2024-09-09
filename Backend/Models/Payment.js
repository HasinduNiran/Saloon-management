import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    PaymentId: {
        type: String,
        unique: true
    },
    CusID: {
        type: String,
        unique: true
    },
    UserName: {
        type: String,
        required: true,
    },
    PaymentDate: {
        type: String,
        required: true,
    },
    PackageAmount: {
        type: String,
        required: true,
    },
    TotalAmount: {
        type: String,
        required: true,
    },
    Method: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    }
});

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

paymentSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const doc = await Counter.findOneAndUpdate({ _id: 'PaymentID' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.PaymentId = 'PID' + doc.seq;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);
