import { Schema, model } from 'mongoose';

const sendMoneyAbroadSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    beneficiaryDetails: {
        name: String,
        bankAccount: String,
        // Add more fields as necessary
    },
    paymentMethod: {
        type: String,
        enum: ['wallet', 'ATM', 'bank'],
        required: true
    },
    opayResponse: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('sendMoneyAbroad', sendMoneyAbroadSchema);
