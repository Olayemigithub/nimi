import { Router } from 'express';
import bcrypt from 'bcrypt'; // For password hashing
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { registerUser, loginUser, requireAuth, getUserData } from '../controllers/userController.js'; 

const router = Router();

// Register user with validation
router.post('/register', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, passwordHash, pin: '' });
        
        try {
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Login user
router.post('/login', loginUser);

// Get user data (protected route)
router.get('/me', requireAuth, getUserData);

// Fetch user settings
router.get('/settings', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name, email: user.email, notificationsEnabled: user.notificationsEnabled });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user settings
router.post('/settings/update', requireAuth, async (req, res) => {
    const { name, email } = req.body;

    // Input validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Settings updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user PIN
router.post('/update-pin', requireAuth, async (req, res) => {
    const { pin } = req.body;

    // Input validation
    if (!pin) {
        return res.status(400).json({ message: 'PIN is required' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, { pin }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'PIN updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Additional route to retrieve user profile
router.get('/profile', requireAuth, (req, res) => {
    res.json({ message: "This is your profile data.", user: req.user });
});

export default router;
