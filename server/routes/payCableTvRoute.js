// payCableTvRoute.js
import express from 'express';
import { processPayment } from '../controllers/paymentController.js'; // Correctly importing processPayment
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Pay Cable TV Route
router.post('/pay-cable-tv', requireAuth, processPayment); // Using processPayment here

export default router;
