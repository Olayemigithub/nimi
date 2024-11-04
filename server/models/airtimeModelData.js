import mongoose from 'mongoose';

const AirtimeDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    networkProvider: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

const AirtimeDataModel = mongoose.model('AirtimeData', AirtimeDataSchema);
export default AirtimeDataModel;
