import mongoose from 'mongoose';

// Define the Wallet Schema
const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    balance: {
        type: Number,
        default: 0, // Default balance is zero
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when the wallet is created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set the date when the wallet is updated
    }
});

// Create the Wallet model
const WalletModel = mongoose.model('Wallet', WalletSchema);

export default WalletModel;
