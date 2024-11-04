import { processPayment } from './paymentController.js';

// Function to handle TSA payments
export const payTsaRoute = async (req, res) => {
    const { amount, userId } = req.body;

    try {
        // Logic to process TSA payment goes here
        // For example, save to database or call an external API

        res.status(200).json({ message: 'TSA payment processed successfully!', amount });
    } catch (error) {
        res.status(500).json({ message: 'Error processing TSA payment', error: error.message });
    }
};
