import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const saloonpackageSchema = mongoose.Schema(
    {
       
        p_name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        base_price: {
            type: Number,
            required: true
        },
        discount_rate: {
            type: Number,
            required: true
        },
        final_price: {
            type: Number,
            required: true
        },
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true
        },
        conditions: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        package_type: {
            type: String,
            required: true
        },
        service_ID: {
            type: String,
            required: true
        },
        
    }
);
export const SaloonPackage = mongoose.model('SaloonPackage' ,saloonpackageSchema);