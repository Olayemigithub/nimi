import { Schema, model } from 'mongoose';

const payTsaSchema = new Schema({
    amount: { type: Number, required: true },
    accountNumber: { type: String, required: true },
    agency: { type: String, required: true },
    description: { type: String },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, default: 'Pending' }
});

export default model('PayTsa', payTsaSchema);
