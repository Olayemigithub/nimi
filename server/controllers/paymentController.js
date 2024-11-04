import Payment from '../models/paymentModel.js';
import { createOpayPayment } from '../services/opayService.js'; // Ensure this is uncommented if you're using OPay
import Wallet from '../models/walletModel.js'; // Other imports as needed

// Main function to process payments
export async function processPayment(req, res) {
    const { userId, recipient, amount, method, currency, type } = req.body;

    try {
        let paymentResponse;
        let status = 'pending'; // Default status

        if (method === 'opay') {
            paymentResponse = await createOpayPayment(amount, currency, recipient);

            // Set status based on the OPay response
            if (paymentResponse.success) {
                status = 'completed';
            } else {
                status = 'failed';
            }
        } else {
            const payment = new Payment({
                user: userId,
                recipient,
                amount,
                paymentMethod: method,
                type, // Payment type (e.g., salary, airtime, etc.)
                status,
            });
            await payment.save();
            paymentResponse = payment; // Save payment details to the database
        }

        res.status(201).json({
            message: 'Payment processed successfully',
            data: paymentResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Payment failed',
            error: error.message,
        });
    }
};

// Function for sending money abroad
export async function sendMoneyAbroad(req, res) {
    const { amount, currency, receiver } = req.body;

    try {
        const paymentResponse = await createOpayPayment(amount, currency, receiver);
        res.json(paymentResponse); // Return OPay API response
    } catch (error) {
        res.status(500).json({ message: 'Foreign payment failed', error: error.message });
    }
};
