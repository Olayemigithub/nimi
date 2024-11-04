// controllers/paySalariesController.js

import Payment from '../models/paymentModel.js'; // Import your Payment model or any relevant model
import Wallet from '../models/walletModel.js'; // Import your Wallet model if you need it

// Function to handle salaries payment
export const paySalariesRoute = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        // Optional: Check if user has sufficient balance in wallet
        const userWallet = await Wallet.findOne({ user: userId });
        if (!userWallet || userWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance in wallet' });
        }

        // Logic to process salary payment goes here
        const payment = new Payment({
            user: userId,
            amount,
            paymentMethod: 'salary', // Define payment method
            type: 'salary', // Type can be used for categorization
            status: 'completed', // Adjust status based on your business logic
        });
        
        await payment.save();

        // Optional: Deduct amount from user wallet
        userWallet.balance -= amount;
        await userWallet.save();

        res.status(200).json({ message: 'Salary payment processed successfully!', payment });
    } catch (error) {
        res.status(500).json({ message: 'Error processing salary payment', error: error.message });
    }
};
