import express from 'express';
import {sendMoneyRoute} from '../controllers/sendMoneyController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send Money Route
router.post('/transfer', requireAuth, sendMoneyRoute);

export default router;
