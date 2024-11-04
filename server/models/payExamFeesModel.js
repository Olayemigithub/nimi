import { Schema, model } from 'mongoose';

const payExamFeesSchema = new Schema({
    candidateName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    examBody: { type: String, required: true },
    examYear: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, default: 'Pending' }
});

export default model('PayExamFees', payExamFeesSchema);
