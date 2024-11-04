// payCableTvController.js
import { processPayment } from './paymentController.js'; // Importing payment processing function

// Example of payCableTvController.js
export const payCableTvRoute = async (req, res) => {
    try {
        // Here you might have logic to get payment details from req.body
        const paymentDetails = req.body;

        // Call the processPayment function to handle the payment
        const result = await processPayment(paymentDetails); // Ensure processPayment is defined correctly

        res.json({ message: 'Cable TV payment processed successfully!', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment processing failed', error: error.message });
    }
};
