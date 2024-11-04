import express from 'express';
import { standingInstruction } from '../controllers/standingInstructionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Standing Instruction Route
router.post('/standing-instruction', requireAuth, standingInstruction);

export default router;
