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
  .post(protect, authorize('admin'), writeLimiter, createNewsStory);

router.route('/:id')
  .get(apiLimiter, getNewsStory)
  .put(protect, authorize('admin'), writeLimiter, updateNewsStory)
  .delete(protect, authorize('admin'), writeLimiter, deleteNewsStory);

module.exports = router;
