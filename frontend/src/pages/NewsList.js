import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../services/api';
import './News.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    category: '',
    language: ''
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const regions = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
  const categories = ['Politics', 'Economy', 'Education', 'Health', 'Infrastructure', 'Technology', 'Environment', 'Social Welfare', 'Other'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Other'];

  useEffect(() => {
    fetchNews();
  }, [filters, page]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = { ...filters, page };
      const res = await newsService.getAll(params);
      setNews(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ region: '', category: '', language: '' });
    setPage(1);
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>News Stories</h1>
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
      </div>

      {loading ? (
        <div className="loading">Loading news stories...</div>
      ) : news.length === 0 ? (
        <div className="no-data">No news stories found</div>
      ) : (
        <>
          <div className="news-grid">
            {news.map(item => (
              <div key={item._id} className="news-card">
                <div className="news-tags">
                  <span className="tag">{item.region}</span>
                  <span className="tag">{item.category}</span>
                  <span className="tag">{item.language}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="news-description">{item.description}</p>
                <p className="news-date">
                  {new Date(item.publishDate).toLocaleDateString()}
                </p>
                <Link to={`/news/${item._id}`} className="btn btn-primary">
                  View Details & Feedback
                </Link>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              className="btn-page"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              className="btn-page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
