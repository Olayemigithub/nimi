import { clear } from 'google-auth-library/build/src/auth/envDetect';
import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    amount: { type: Number, required: true},
    type: { type: String, enum: ['money', 'utility'], require: true },
    accountNumber: { type: String, required: true },
    timestamp: {type: Date, default: Date.now },
});

export default model('Transaction', TransactionSchema);