import { processPayment } from './paymentController.js';

export const sendMoneyRoute = async (req, res) => {
    // Your logic for sending money
    res.json({ message: 'Money sent successfully!' });
};
