import mongoose from "mongoose";

// Counter Schema
const counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

// Model for the counter collection
const AppoiCounter = mongoose.model('AppoiCounter', counterSchema);

// Appointment Schema
const appointmentSchema = mongoose.Schema(
    {
        appoi_ID: {
            type: String,
            unique: true
        },
        client_name: {
            type: String,
            required: true
        },
        client_email: {
            type: String,
            required: true
        },
        client_phone: {
            type: Number,
            required: true
        },
        stylist: {
            type: String,
            required: true
        },
        service: {
            type: String,
            required: true
        },
        customize_package: {
            type: String,
            required: true
        },
        appoi_date: {
            type: Date,
            required: true
        },
        appoi_time: {
            type: String,
            required: true
        },
    }
);

// Pre-save hook to generate appoi_ID
appointmentSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const doc = await AppoiCounter.findOneAndUpdate(
                { _id: 'appoi_ID' }, // The ID for this counter in the counter collection
                { $inc: { seq: 1 } }, // Increment the sequence by 1
                { new: true, upsert: true } // Create a new counter if it doesn't exist
            );
            this.appoi_ID = 'appointment' + doc.seq; // Assigning incremental appoi_ID
        }
        next();
    } catch (error) {
        next(error); // Pass any error to the error handler
    }
});

// Export the Appointment model
export const Appointment = mongoose.model('Appointment', appointmentSchema);
