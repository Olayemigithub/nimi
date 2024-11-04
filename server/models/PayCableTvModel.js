import { Schema, model } from 'mongoose';

const payCableTvSchema = new Schema({
    accountNumber: { type: String, required: true },
    provider: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, default: 'Pending' }
});

export default model('PayCableTv', payCableTvSchema);
