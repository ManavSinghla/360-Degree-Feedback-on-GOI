import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/api';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    category: '',
    language: ''
  });

  const regions = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
  const categories = ['Politics', 'Economy', 'Education', 'Health', 'Infrastructure', 'Technology', 'Environment', 'Social Welfare', 'Other'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Other'];

  useEffect(() => {
    fetchAnalytics();
  }, [filters]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await analyticsService.getDashboard(filters);
      setAnalytics(res.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ region: '', category: '', language: '' });
  };

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (!analytics) return <div className="error">Failed to load analytics</div>;

  // Prepare sentiment chart data
  const sentimentData = {
    labels: analytics.sentimentDistribution.map(s => s._id),
    datasets: [{
      data: analytics.sentimentDistribution.map(s => s.count),
      backgroundColor: [
        'rgba(75, 192, 75, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgba(75, 192, 75, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 2
    }]
  };

  // Prepare region chart data
  const regionData = {
    labels: analytics.feedbackByRegion.map(r => r._id),
    datasets: [
      {
        label: 'Positive',
        data: analytics.feedbackByRegion.map(r => r.positiveCount),
        backgroundColor: 'rgba(75, 192, 75, 0.8)',
      },
      {
        label: 'Neutral',
        data: analytics.feedbackByRegion.map(r => r.neutralCount),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Negative',
        data: analytics.feedbackByRegion.map(r => r.negativeCount),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ]
  };

  // Prepare category chart data
  const categoryData = {
    labels: analytics.feedbackByCategory.map(c => c._id),
    datasets: [
      {
        label: 'Positive',
        data: analytics.feedbackByCategory.map(c => c.positiveCount),
        backgroundColor: 'rgba(75, 192, 75, 0.8)',
      },
      {
        label: 'Neutral',
        data: analytics.feedbackByCategory.map(c => c.neutralCount),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Negative',
        data: analytics.feedbackByCategory.map(c => c.negativeCount),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ]
  };

  return (
    <div className="analytics-container">
      <h1>Analytics Dashboard</h1>

      <div className="filters">
        <select name="region" value={filters.region} onChange={handleFilterChange}>
          <option value="">All Regions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="language" value={filters.language} onChange={handleFilterChange}>
          <option value="">All Languages</option>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button onClick={clearFilters} className="btn-clear">Clear Filters</button>
      </div>

      <div className="overview-cards">
        <div className="overview-card">
          <h3>Total News Stories</h3>
          <p className="count">{analytics.overview.totalNewsStories}</p>
        </div>
        <div className="overview-card">
          <h3>Total Feedback</h3>
          <p className="count">{analytics.overview.totalFeedback}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Sentiment Distribution</h2>
          <div className="chart-container">
            <Pie data={sentimentData} />
          </div>
        </div>

        <div className="chart-card full-width">
          <h2>Feedback by Region</h2>
          <div className="chart-container">
            <Bar data={regionData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>

        <div className="chart-card full-width">
          <h2>Feedback by Category</h2>
          <div className="chart-container">
            <Bar data={categoryData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>

      <div className="recent-feedback">
        <h2>Recent Feedback</h2>
        <div className="feedback-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>News Story</th>
                <th>Sentiment</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentFeedback.map(feedback => (
                <tr key={feedback._id}>
                  <td>{feedback.user?.name || 'Anonymous'}</td>
                  <td>{feedback.newsStory?.title}</td>
                  <td>
                    <span className={`sentiment-badge ${feedback.sentiment.toLowerCase()}`}>
                      {feedback.sentiment}
                    </span>
                  </td>
                  <td className="comment-cell">{feedback.comment}</td>
                  <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
