import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>360° Feedback on Government of India News</h1>
        <p className="hero-subtitle">
          Share your perspective on government news stories from regional media
        </p>
        <div className="hero-buttons">
          <Link to="/news" className="btn btn-primary">Browse News Stories</Link>
          <Link to="/register" className="btn btn-secondary">Get Started</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📰 Browse News</h3>
            <p>Access government news stories from various regional media sources across India</p>
          </div>
          <div className="feature-card">
            <h3>💬 Share Feedback</h3>
            <p>Submit your feedback with sentiment analysis: Positive, Neutral, or Negative</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Filter & Search</h3>
            <p>Filter news by region, language, and category to find relevant stories</p>
          </div>
          <div className="feature-card">
            <h3>📊 Analytics</h3>
            <p>Admins can view comprehensive analytics and insights from user feedback</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register or Login</h3>
            <p>Create your account to start participating</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Stories</h3>
            <p>Explore news stories filtered by your preferences</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Submit Feedback</h3>
            <p>Share your thoughts and sentiment on each story</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Impact</h3>
            <p>See how your feedback contributes to the bigger picture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
