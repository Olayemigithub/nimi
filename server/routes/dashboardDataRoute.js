import { Router } from 'express';
import { getDashboardDataRoute } from '../controllers/dashboardController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/:userId', requireAuth, getDashboardDataRoute);

export default router;
