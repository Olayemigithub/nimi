const express = require('express');
const { createWallet, getBalance, fundWallet, withdrawFromWallet } = require('../controllers/walletController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', requireAuth, createWallet);
router.get('/balance/:userId', requireAuth, getBalance);
router.post('/fund', requireAuth, fundWallet);
router.post('/withdraw', requireAuth, withdrawFromWallet);

module.exports = router;
