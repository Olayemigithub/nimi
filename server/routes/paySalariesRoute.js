// routes/paySalariesRoute.js

import express from 'express';
import { paySalariesRoute } from '../controllers/paySalariesController.js';
import { requireAuth } from '../middleware/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();

// Pay Salaries Route
router.post('/pay-salaries', requireAuth, paySalariesRoute); // Secure the route with requireAuth

export default router;
