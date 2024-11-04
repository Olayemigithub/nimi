import express from 'express';
import { sendMoneyAbroad, verifyBankAccount } from '../controllers/sendMoneyAbroadController.js'; // Adjust the path as needed
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Send Money Abroad Route
router.post('/send-money-abroad', requireAuth, sendMoneyAbroad);

// Route to verify international bank account (IBAN)
router.get('/verify-bank-account', requireAuth, verifyBankAccount);

export default router;
