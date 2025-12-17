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

router.post('/', writeLimiter, protect, createFeedback);
router.get('/my-feedback', apiLimiter, protect, getMyFeedback);
router.get('/news/:newsId', apiLimiter, getFeedbackByNews);
router.route('/:id')
  .put(writeLimiter, protect, updateFeedback)
  .delete(writeLimiter, protect, deleteFeedback);

module.exports = router;
