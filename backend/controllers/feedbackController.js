const Feedback = require('../models/Feedback');
const NewsStory = require('../models/NewsStory');

// @desc    Get all feedback for a news story
// @route   GET /api/feedback/news/:newsId
// @access  Public
exports.getFeedbackByNews = async (req, res) => {
  try {
    const feedback = await Feedback.find({ newsStory: req.params.newsId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
  try {
    const { newsStory, sentiment, comment, rating } = req.body;

    // Check if news story exists
    const newsExists = await NewsStory.findById(newsStory);
    if (!newsExists) {
      return res.status(404).json({
        success: false,
        message: 'News story not found'
      });
    }

    // Check if user already submitted feedback for this news story
    const existingFeedback = await Feedback.findOne({
      newsStory,
      user: req.user.id
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted feedback for this news story'
      });
    }

    const feedback = await Feedback.create({
      newsStory,
      user: req.user.id,
      sentiment,
      comment,
      rating
    });

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private
exports.updateFeedback = async (req, res) => {
  try {
    let feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Make sure user is feedback owner
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this feedback'
      });
    }

    feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Make sure user is feedback owner or admin
    if (feedback.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this feedback'
      });
    }

    await feedback.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's feedback
// @route   GET /api/feedback/my-feedback
// @access  Private
exports.getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .populate('newsStory', 'title region category language')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
