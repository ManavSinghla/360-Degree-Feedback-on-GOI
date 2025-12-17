const Feedback = require('../models/Feedback');
const NewsStory = require('../models/NewsStory');

// @desc    Get analytics dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const { region, category, language, startDate, endDate } = req.query;

    // Build match query for filtering
    const matchQuery = {};
    if (region) matchQuery.region = region;
    if (category) matchQuery.category = category;
    if (language) matchQuery.language = language;
    if (startDate || endDate) {
      matchQuery.publishDate = {};
      if (startDate) matchQuery.publishDate.$gte = new Date(startDate);
      if (endDate) matchQuery.publishDate.$lte = new Date(endDate);
    }

    // Get sentiment distribution
    const sentimentStats = await Feedback.aggregate([
      {
        $lookup: {
          from: 'newsstories',
          localField: 'newsStory',
          foreignField: '_id',
          as: 'storyDetails'
        }
      },
      { $unwind: '$storyDetails' },
      { $match: matchQuery },
      {
        $group: {
          _id: '$sentiment',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get feedback by region
    const regionStats = await Feedback.aggregate([
      {
        $lookup: {
          from: 'newsstories',
          localField: 'newsStory',
          foreignField: '_id',
          as: 'storyDetails'
        }
      },
      { $unwind: '$storyDetails' },
      { $match: matchQuery },
      {
        $group: {
          _id: '$storyDetails.region',
          count: { $sum: 1 },
          positiveCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Positive'] }, 1, 0] }
          },
          neutralCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Neutral'] }, 1, 0] }
          },
          negativeCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Negative'] }, 1, 0] }
          }
        }
      }
    ]);

    // Get feedback by category
    const categoryStats = await Feedback.aggregate([
      {
        $lookup: {
          from: 'newsstories',
          localField: 'newsStory',
          foreignField: '_id',
          as: 'storyDetails'
        }
      },
      { $unwind: '$storyDetails' },
      { $match: matchQuery },
      {
        $group: {
          _id: '$storyDetails.category',
          count: { $sum: 1 },
          positiveCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Positive'] }, 1, 0] }
          },
          neutralCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Neutral'] }, 1, 0] }
          },
          negativeCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'Negative'] }, 1, 0] }
          }
        }
      }
    ]);

    // Get total counts
    const totalNewsStories = await NewsStory.countDocuments(matchQuery);
    const totalFeedback = await Feedback.countDocuments();

    // Get recent feedback
    const recentFeedback = await Feedback.find()
      .populate('newsStory', 'title region category')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalNewsStories,
          totalFeedback
        },
        sentimentDistribution: sentimentStats,
        feedbackByRegion: regionStats,
        feedbackByCategory: categoryStats,
        recentFeedback
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get feedback trends over time
// @route   GET /api/analytics/trends
// @access  Private/Admin
exports.getFeedbackTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const trends = await Feedback.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            sentiment: '$sentiment'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
