import { Schema, model } from 'mongoose';

const standingInstructionSchema = new Schema({
    user: { type: String, required: true },
    instructionDetails: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true }, // e.g. Monthly, Quarterly
    startDate: { type: Date, required: true },
    nextPaymentDate: { type: Date },
    paymentStatus: { type: String, default: 'Active' }
});

export default model('StandingInstruction', standingInstructionSchema);
