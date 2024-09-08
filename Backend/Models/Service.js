import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const serviceSchema = mongoose.Schema(
    {
        service_ID: {
            type: String,
            unique: true,
            default: uuidv4
        },
        category : {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        available: {
            type: String,
            required: true
        },
       
        
    }
);
export const Service = mongoose.model('Service' ,serviceSchema);