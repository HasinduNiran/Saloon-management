import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
    {
    user_id: {
        type: String,
    },
    serviceID: { 
        type: mongoose.Types.ObjectId,
        
    },
    message:{
        type: String,
        required: true,
    },
    star_rating:{
        type:Number,
        required: true,
    },
},
{ timestamps: true }
    
);
const   Feedback = mongoose.model('Feedback' ,feedbackSchema);
export default Feedback;