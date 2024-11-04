import express from 'express';
import { payExamFeesRoute } from '../controllers/payExamFessController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Pay Exam Fees Route
router.post('/pay-exam-fees', requireAuth, payExamFeesRoute);

export default router;
