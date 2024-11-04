import { Schema, model } from 'mongoose';

const sendMoneySchema = new Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paymentMethod: { type: String, enum: ['wallet', 'ATM', 'bank'], required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, default: 'Pending' }
});

export default model('SendMoney', sendMoneySchema);
