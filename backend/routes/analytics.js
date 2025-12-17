const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getFeedbackTrends
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

router.get('/dashboard', apiLimiter, protect, authorize('admin'), getDashboardAnalytics);
router.get('/trends', apiLimiter, protect, authorize('admin'), getFeedbackTrends);

module.exports = router;
