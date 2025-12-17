const mongoose = require('mongoose');

const newsStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  region: {
    type: String,
    required: [true, 'Please provide a region'],
    enum: ['North', 'South', 'East', 'West', 'Central', 'Northeast']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Politics', 'Economy', 'Education', 'Health', 'Infrastructure', 'Technology', 'Environment', 'Social Welfare', 'Other']
  },
  language: {
    type: String,
    required: [true, 'Please provide a language'],
    enum: ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Other']
  },
  sourceUrl: {
    type: String,
    trim: true
  },
  publishDate: {
    type: Date,
    required: [true, 'Please provide a publish date']
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  imageUrl: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
newsStorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('NewsStory', newsStorySchema);
