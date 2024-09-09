import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // Import uuid
const appointmentSchema = mongoose.Schema(
    {
        appoi_ID: {
            type: String,
            unique: true,
            default: uuidv4 // Automatically generate a unique appoi_ID
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
export const Appointment = mongoose.model('Appointment' ,appointmentSchema);