import mongoose from "mongoose";
const packageSchema = mongoose.Schema(
    {
        p_ID: {
            type: String,
            unique: true
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
            enum: ['Standard', 'Promotional'],
            required: true
        },
        service_ID: {
            type: String,
            required: true
        },
        
    }
);
export const Package = mongoose.model('Package' ,packageSchema);