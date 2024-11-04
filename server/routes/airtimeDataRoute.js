import express from 'express';
import { airtimeDataController } from '../controllers/airtimeDataController.js';

const router = express.Router();

// Define the route for airtime purchase
router.post('/purchase-airtime', airtimeDataController);

export default router;
