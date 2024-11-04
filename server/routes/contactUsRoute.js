import express from 'express'; // Import express to use Router
import { sendContactMessage } from '../controllers/contactUsController.js';

const router = express.Router(); // Initialize the Router

router.post('/contact-us', sendContactMessage); // Route for '/api/contact-us'

export default router;

