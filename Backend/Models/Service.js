import mongoose from "mongoose";
const serviceSchema = mongoose.Schema(
    {
        service_ID: {
            type: String,
            unique: true
        },
        category : {
            type: String,
            enum: ['Hair', 'Nails','Skincare'],
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
            enum: ['Yes', 'N0'],
            required: true
        },
       
        
    }
);
export const Service = mongoose.model('Service' ,serviceSchema);