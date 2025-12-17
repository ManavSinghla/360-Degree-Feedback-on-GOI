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

router.route('/')
  .get(getNewsStories)
  .post(protect, authorize('admin'), createNewsStory);

router.route('/:id')
  .get(getNewsStory)
  .put(protect, authorize('admin'), updateNewsStory)
  .delete(protect, authorize('admin'), deleteNewsStory);

module.exports = router;
