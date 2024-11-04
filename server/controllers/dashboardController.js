import { find } from '../models/transaction';
import { findOne } from '../models/wallet';

export async function getDashboardData(req, res) {
    const { userId } = req.params;
    try {
        const wallet = await findOne({ userId });
        const transactions = await find({ userId }).limit(10).sort({ date: -1 });
        res.json({ wallet, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
