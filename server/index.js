import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import userRoute from './routes/userRoute.js';
import sendMoneyAbroadRoute from './routes/sendMoneyAbroadRoute.js';
import sendMoneyRoute from './routes/sendMoneyRoute.js';
import airtimeDataRoute from './routes/airtimeDataRoute.js';
import payCableTvRoute from './routes/payCableTvRoute.js';
import payTsaRoute from './routes/payTsaRoute.js';
import paySalariesRoute from './routes/paySalariesRoute.js';
import standingInstructionRoute from './routes/standingInstructionRoute.js';
import contactUsRoute from './routes/contactUsRoute.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json()); // Built-in body parsing for JSON
app.use(express.urlencoded({ extended: true })); // Built-in body parsing for URL-encoded data
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up Mongoose connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb'; // Use your MongoDB URI
connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoute);
app.use('/api/send-money-abroad', sendMoneyAbroadRoute);
app.use('/api/send-money', sendMoneyRoute);
app.use('/api/buy-airtime', airtimeDataRoute);
app.use('/api/pay-cable-tv', payCableTvRoute);
app.use('/api/pay-tsa', payTsaRoute);
app.use('/api/pay-salaries', paySalariesRoute);
app.use('/api/standing-instruction', standingInstructionRoute);
app.use('/api/contact-us', contactUsRoute);

// Test route to ensure server is working
app.get('/', (req, res) => res.send('Welcome to the Payment API'));

// Define authentication routes
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
});

app.post('/api/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.json({ message: 'Logged out successfully' });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
