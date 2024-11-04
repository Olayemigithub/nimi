import Wallet from '../models/wallet.js'; // Ensure correct import
import Transaction from '../models/Transaction.js'; // Ensure correct import

export async function createWallet(req, res) {
    const { userId } = req.body;
    try {
        const wallet = new Wallet({ userId, balance: 0 });
        await wallet.save();
        res.status(201).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getBalance(req, res) {
    const { userId } = req.params;
    try {
        const wallet = await Wallet.findOne({ userId }); // Call findOne on Wallet
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
        res.json({ balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function fundWallet(req, res) {
    const { userId, amount } = req.body;
    try {
        const wallet = await Wallet.findOne({ userId }); // Call findOne on Wallet
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

        wallet.balance += amount;
        await wallet.save();

        const transaction = new Transaction({
            userId,
            type: 'credit',
            amount,
            date: new Date()
        });
        await transaction.save();

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function withdrawFromWallet(req, res) {
    const { userId, amount } = req.body;
    try {
        const wallet = await Wallet.findOne({ userId }); // Call findOne on Wallet
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        wallet.balance -= amount;
        await wallet.save();

        const transaction = new Transaction({
            userId,
            type: 'debit',
            amount,
            date: new Date()
        });
        await transaction.save();

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
