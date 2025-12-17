import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsService, feedbackService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [news, setNews] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    sentiment: 'Neutral',
    comment: '',
    rating: 3
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchNewsAndFeedback();
  }, [id]);

  const fetchNewsAndFeedback = async () => {
    try {
      setLoading(true);
      const [newsRes, feedbackRes] = await Promise.all([
        newsService.getById(id),
        feedbackService.getByNews(id)
      ]);
      setNews(newsRes.data.data);
      setFeedbacks(feedbackRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load news story');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setError('');
      await feedbackService.create({
        newsStory: id,
        ...feedbackForm
      });
      setSuccess('Feedback submitted successfully!');
      setShowFeedbackForm(false);
      setFeedbackForm({ sentiment: 'Neutral', comment: '', rating: 3 });
      fetchNewsAndFeedback();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit feedback');
    }
  };

  const getSentimentStats = () => {
    const stats = { Positive: 0, Neutral: 0, Negative: 0 };
    feedbacks.forEach(f => {
      stats[f.sentiment]++;
    });
    return stats;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!news) return <div className="error">News story not found</div>;

  const stats = getSentimentStats();

  return (
    <div className="news-detail-container">
      <div className="news-content">
        <div className="news-meta">
          <span className="tag">{news.region}</span>
          <span className="tag">{news.category}</span>
          <span className="tag">{news.language}</span>
        </div>
        <h1>{news.title}</h1>
        <p className="news-author">By {news.author} | {new Date(news.publishDate).toLocaleDateString()}</p>
        <p className="news-description">{news.description}</p>
        <div className="news-body">{news.content}</div>
        {news.sourceUrl && (
          <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
            Read Original Source
          </a>
        )}
      </div>

      <div className="feedback-section">
        <h2>Feedback ({feedbacks.length})</h2>
        
        <div className="sentiment-stats">
          <div className="stat positive">
            <span className="stat-label">Positive</span>
            <span className="stat-count">{stats.Positive}</span>
          </div>
          <div className="stat neutral">
            <span className="stat-label">Neutral</span>
            <span className="stat-count">{stats.Neutral}</span>
          </div>
          <div className="stat negative">
            <span className="stat-label">Negative</span>
            <span className="stat-count">{stats.Negative}</span>
          </div>
        </div>

        {isAuthenticated && !showFeedbackForm && (
          <button onClick={() => setShowFeedbackForm(true)} className="btn btn-primary">
            Add Your Feedback
          </button>
        )}

        {!isAuthenticated && (
          <p className="info-message">Please <Link to="/login">login</Link> to submit feedback</p>
        )}

        {showFeedbackForm && (
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
              <label>Sentiment</label>
              <select 
                value={feedbackForm.sentiment}
                onChange={(e) => setFeedbackForm({...feedbackForm, sentiment: e.target.value})}
                required
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rating (1-5)</label>
              <input 
                type="number"
                min="1"
                max="5"
                value={feedbackForm.rating}
                onChange={(e) => setFeedbackForm({...feedbackForm, rating: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Comment</label>
              <textarea 
                value={feedbackForm.comment}
                onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                required
                rows="4"
                maxLength="1000"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
              <button type="button" onClick={() => setShowFeedbackForm(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="feedback-list">
          {feedbacks.map(feedback => (
            <div key={feedback._id} className={`feedback-item ${feedback.sentiment.toLowerCase()}`}>
              <div className="feedback-header">
                <span className="feedback-user">{feedback.user?.name || 'Anonymous'}</span>
                <span className={`feedback-sentiment ${feedback.sentiment.toLowerCase()}`}>
                  {feedback.sentiment}
                </span>
                <span className="feedback-rating">Rating: {feedback.rating}/5</span>
              </div>
              <p className="feedback-comment">{feedback.comment}</p>
              <span className="feedback-date">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
