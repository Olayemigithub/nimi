import express from 'express';
import { payTsaRoute } from '../controllers/payTsaController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Pay TSA Route
router.post('/pay-tsa-states', requireAuth, payTsaRoute);

export default router;
