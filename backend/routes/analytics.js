const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getFeedbackTrends
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('admin'), getDashboardAnalytics);
router.get('/trends', protect, authorize('admin'), getFeedbackTrends);

module.exports = router;
