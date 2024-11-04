// routes/paymentRoute.js
import { Router } from 'express';
import { sendMoneyRoute } from '../controllers/sendMoneyController';
import { requireAuth } from '../middleware/authMiddleware';
import { airtimeDataRoute } from '../controllers/airtimeDataController';
import { cableTvRoute } from '../controllers/payCableTvController';
import { paySalariesRoute } from '../controllers/paySalariesController';
import { payTsaRoute } from '../controllers/payTsaController';
import { standingInstructionRoute } from '../controllers/standingInstructionController';
import { sendMoneyAbroadRoute } from '../controllers/sendMoneyAbroadController';
import { payExamFeesRoute } from '../controllers/payExamFeesController';
import { paySchoolFeeRoute } from '../controllers/paySchoolFeeController';

const router = Router();

// Apply authMiddleware to all routes that require authorization

// Send Money Endpoint
router.post('/send-money', requireAuth, sendMoneyRoute);

// Pay Salaries Endpoint
router.post('/pay-salaries', requireAuth, paySalariesRoute);

// Airtime/Data Endpoint
router.post('/airtime-data', requireAuth, airtimeDataRoute);

// Cable Television Payment Endpoint
router.post('/cable-television', requireAuth, cableTvRoute);

// Pay TSA to States
router.post('/pay-tsa-states', requireAuth, payTsaRoute);

// Standing Instruction Endpoint
router.post('/standing-instruction', requireAuth, standingInstructionRoute);

// Pay Exam Fees Endpoint
router.post('/pay-exam-fees', requireAuth, payExamFeesRoute);

// Foreign Payment Endpoint
router.post('/send-money-abroad', requireAuth, sendMoneyAbroadRoute);

// School Fee Payment Endpoint
router.post('/pay-school-fee', requireAuth, paySchoolFeeRoute);

export default router;
