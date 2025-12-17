const express = require('express');
const router = express.Router();
const {
  getNewsStories,
  getNewsStory,
  createNewsStory,
  updateNewsStory,
  deleteNewsStory
} = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');
const { apiLimiter, writeLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(apiLimiter, getNewsStories)
  .post(writeLimiter, protect, authorize('admin'), createNewsStory);

router.route('/:id')
  .get(apiLimiter, getNewsStory)
  .put(writeLimiter, protect, authorize('admin'), updateNewsStory)
  .delete(writeLimiter, protect, authorize('admin'), deleteNewsStory);

module.exports = router;
