import { Schema, model } from 'mongoose';

const paySalariesSchema = new Schema({
    amount: { type: Number, required: true },
    employeeDetails: [{
        name: String,
        accountNumber: String,
        bankName: String
    }],
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, default: 'Pending' }
});

export default model('PaySalaries', paySalariesSchema);
