import express from 'express';
import { 
    createFeedback, 
    getAllFeedback, 
    getOneFeedback, 
    updateFeedback, 
    deleteFeedback,
    updateFeedbackStatus
} from '../controllers/feedbackController.js';

const router = express.Router();

// Feedback routes
router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.get('/:id', getOneFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);
router.patch('/status/:id', updateFeedbackStatus);

export default router;
