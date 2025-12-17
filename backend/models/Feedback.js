const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  newsStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewsStory',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sentiment: {
    type: String,
    required: [true, 'Please provide a sentiment'],
    enum: ['Positive', 'Neutral', 'Negative']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure one feedback per user per news story
feedbackSchema.index({ newsStory: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
