import React, { useState, useEffect } from 'react';
import { feedbackService } from '../services/api';
import { Link } from 'react-router-dom';
import './MyFeedback.css';

const MyFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  const fetchMyFeedback = async () => {
    try {
      setLoading(true);
      const res = await feedbackService.getMyFeedback();
      setFeedbacks(res.data.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading your feedback...</div>;

  return (
    <div className="my-feedback-container">
      <h1>My Feedback</h1>
      
      {feedbacks.length === 0 ? (
        <div className="no-feedback">
          <p>You haven't submitted any feedback yet.</p>
          <Link to="/news" className="btn btn-primary">Browse News Stories</Link>
        </div>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map(feedback => (
            <div key={feedback._id} className="feedback-card">
              <div className="feedback-news-title">
                <Link to={`/news/${feedback.newsStory?._id}`}>
                  {feedback.newsStory?.title}
                </Link>
              </div>
              <div className="feedback-meta">
                <span className={`sentiment-badge ${feedback.sentiment.toLowerCase()}`}>
                  {feedback.sentiment}
                </span>
                <span className="rating">Rating: {feedback.rating}/5</span>
              </div>
              <p className="feedback-comment">{feedback.comment}</p>
              <div className="feedback-footer">
                <span className="feedback-date">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </span>
                <div className="news-tags">
                  <span className="tag">{feedback.newsStory?.region}</span>
                  <span className="tag">{feedback.newsStory?.category}</span>
                  <span className="tag">{feedback.newsStory?.language}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFeedback;
