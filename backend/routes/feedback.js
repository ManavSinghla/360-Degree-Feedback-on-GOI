const express = require('express');
const router = express.Router();
const {
  getFeedbackByNews,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getMyFeedback
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { apiLimiter, writeLimiter } = require('../middleware/rateLimiter');

router.post('/', protect, writeLimiter, createFeedback);
router.get('/my-feedback', protect, apiLimiter, getMyFeedback);
router.get('/news/:newsId', apiLimiter, getFeedbackByNews);
router.route('/:id')
  .put(protect, writeLimiter, updateFeedback)
  .delete(protect, writeLimiter, deleteFeedback);

module.exports = router;
