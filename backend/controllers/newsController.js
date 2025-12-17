const NewsStory = require('../models/NewsStory');

// @desc    Get all news stories
// @route   GET /api/news
// @access  Public
exports.getNewsStories = async (req, res) => {
  try {
    const { region, category, language, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (region) query.region = region;
    if (category) query.category = category;
    if (language) query.language = language;

    const skip = (page - 1) * limit;
    
    const newsStories = await NewsStory.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await NewsStory.countDocuments(query);

    res.status(200).json({
      success: true,
      count: newsStories.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: newsStories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single news story
// @route   GET /api/news/:id
// @access  Public
exports.getNewsStory = async (req, res) => {
  try {
    const newsStory = await NewsStory.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!newsStory) {
      return res.status(404).json({
        success: false,
        message: 'News story not found'
      });
    }

    res.status(200).json({
      success: true,
      data: newsStory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new news story
// @route   POST /api/news
// @access  Private/Admin
exports.createNewsStory = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    
    const newsStory = await NewsStory.create(req.body);

    res.status(201).json({
      success: true,
      data: newsStory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update news story
// @route   PUT /api/news/:id
// @access  Private/Admin
exports.updateNewsStory = async (req, res) => {
  try {
    let newsStory = await NewsStory.findById(req.params.id);

    if (!newsStory) {
      return res.status(404).json({
        success: false,
        message: 'News story not found'
      });
    }

    newsStory = await NewsStory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: newsStory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete news story
// @route   DELETE /api/news/:id
// @access  Private/Admin
exports.deleteNewsStory = async (req, res) => {
  try {
    const newsStory = await NewsStory.findById(req.params.id);

    if (!newsStory) {
      return res.status(404).json({
        success: false,
        message: 'News story not found'
      });
    }

    await newsStory.deleteOne();

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
