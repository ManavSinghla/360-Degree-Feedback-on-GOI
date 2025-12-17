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

router.post('/', protect, createFeedback);
router.get('/my-feedback', protect, getMyFeedback);
router.get('/news/:newsId', getFeedbackByNews);
router.route('/:id')
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

module.exports = router;
