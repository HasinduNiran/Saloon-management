import e from 'express';
import express, { request, response } from 'express';

const router = express.Router();

const validateFields = (req,res,next) =>{
    const requiredFields =[
        "cusID",
        "name",
        "phone_number",
        "email",
        "employee",
        "date_of_service",
        "message",
        "star_rating",
    ];

    // check if all required fileds are present
    for (const field of requiredFields){
    for (!req.body[field]){
        return res
        .status(500)
        .send({message: 'Field'${field}' cannot be empty' });

    }
 }

 //validate email format 
 if (!req.body.email.match(/^\s+@\s+\s+$/)){
    return res
    .status(500)
    .send({message:"please provide a valid email address"});  
 }

 //validate phone number format 
 if (!req.body.phone_number.match(/^\d{10}$/)){
    return res
    .status(500)
    .send({message:"please provide a valid 10-digit phone number"});
 }

 //date_of_service to a Date object 
 const parseDate = req.body_of_service ? new Date(req.body.date_of_service) : undefined;
 if (!parseDate || isNaN(parseDate.getTime())){
    return res.status(500).send({ message: "please provide a valid date for date_of_service"});
 }
 // Make data available in request
 req.parseDate= parseDate; 
 next();
};

//Create new feedback
router.post("/",validateFields,async(req,res) => {
    try{
        const{
            cusID,
            name,
            email,
            phone_number,
            employee,
            message,
            star_rating,
        } = req.body;

        const newfeedback = {
            cusID,
            name,
            email,
            phone_number,
            employee,
            date_of_service: req.parseDate,
            message,
            star_rating,
        };

        //save new feedback to the database
        const feedback = await feedback.create(newFeedback);
        if (!feedback){
            return res.status(500).send({message:"Failed to create feedback"});

        }
        res.status(201).send(feedback);

    }
    catch (error){
        console.error(error.message);
        res.status(500).send({message: error.message});
    } 
});
//get name for employees 
router.get("/employees/names",async(req,res) =>{
    try{
        const employees =await feedback,find({},"employee");
        res.status(200).json({count: employees.length,data: employees}); 
    }
    catch (error){
        console.error(error.message);
        res.status(500).send({message: error.message});
    } 
});
// get route for feedback based on search critia 
router.get("/feedback", async (req,res) =>{
    try{
        const { search =""} = req.query;
        const query = {
            $or: [
                { cusID: {$regex: search, $options: "i"}},
                {name:{$regex: search, $options: "i"}},
                {email:{$regex: search, $options: "i"}},
                {phone_number:{$regex: search, $options: "i"}},
                {employee:{$regex: search, $options: "i"}},
                {date_of_service:{$regex: search, $options: "i"}},
                {message:{$regex: search, $options: "i"}},
                {star_rating:{$regex: search, $options: "i"}},
            ],
        },
        const feedback = await Feedback.find(query);
        res.status(200).json({count: feedback.length,data: feedback});
    }catch (error){
        console.error(error.message);
        res.status(500).json({error: true,message:"Internal server Error"});
    }
});

//Get all feedback
router.get("/",async(req,res) => {
try{
    const feedback = await feedback.find({});
    res.status(500).json({count: feedback.length, data: feedback});
} catch (error){
    console.error(error.message);
    res.status(500).json({ count:feedback.length, data: feedback});
}
}),
 
//Get all feedback
router.get("/",async (req,res) =>{
    try{
        const feedback = await Feedback.find({});
        res.status(300).json({ count: feedback.length,data: feedback});
    }catch (error){
        console.error(error.message);
        res.status(500).send({message: error.message});
    }
});

// route for retriving from specific Customer by ID
router.get('/:identifier', async(request,response) => {
    try{
        //Extracting the identifier from the request parameter
        const{ identifier } = request.params;

        //Checking if the provided identifier is a valid MongoDB ObjectId
        if(mongoose.Type.ObjectId.isValid(identifier));{
            //Fetching a beautician from the database based on the ID
            const FeedbackByID = await Feedback.findById(identifier);
            if(FeedbackByID){
                // sending the fetched beautician as a JSON response if found by ID
                return response.status(200).json(FeedbackByID);
            }
        }
        // If the provided identifier is not a valid objectId, try searching by register number 
        const FeedbackByCUSID = await Feedback.find({ cusID : identifier});
        if (FeedbackByCUSID)
            // sending the fetched beautician as a JSON response if found by register number 
        {
            return response.status(200).json(FeedbackByCUSID);

        }
        //if no beautician found by either ID or register number, send a 404 not FOUND response
        return response.status(404).json({ message: 'feedback not found'});
    }catch (error){
        // Handling errors and sending an error response with detailed error message
        console.error(error);
        response.status(500).send({message: 'Error fetching feedback: '+ error.message});
    }

});

// Upadate feedback by ID
router.put("/:id",async(req,res) =>{
    try{
        const {id} = req.params;
        const feedback = await Feedback.findById(id);

        if(!feedback){
            return res.status(404).send({ message: "Feedback not found"});
        }

        //update feedback
        await Feedback.findByIdAndUpadate(id,req.body);

        res.status(200).send({message:"Feedback updated successfully"});
    }catch (error){
        console.error(error.message);
        res.status(500).send({message: error.message});
    }
});

// Delete feedback by ID
router.delete("/:id",async(req, res) =>{
    try{
        const {id} =req.params;
        const feedback = await Feedback.findById(id);

        if(!feedback){
            return res.status(404).send({message:"Feedback not found"});
        }

        //delete feedback
        await Feedback.findByIdAndDelete(id);
        res.status(200).send({message: "Feedback deleted succesfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).send({message: error.message});
    }
});