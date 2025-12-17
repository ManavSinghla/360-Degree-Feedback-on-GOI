const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getFeedbackTrends
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

router.get('/dashboard', protect, authorize('admin'), apiLimiter, getDashboardAnalytics);
router.get('/trends', protect, authorize('admin'), apiLimiter, getFeedbackTrends);

module.exports = router;
