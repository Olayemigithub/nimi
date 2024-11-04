import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Consistency with bcryptjs
const { compare, genSalt, hash } = bcrypt;

// User schema definition with timestamps
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        pin: {
            type: String,
            required: true,
        },
        notificationsEnabled: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

// Exporting the User model
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
