import React, { useState, useEffect } from 'react';
import { newsService } from '../services/api';
import './AdminNews.css';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    region: 'North',
    category: 'Politics',
    language: 'English',
    author: '',
    sourceUrl: '',
    publishDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const regions = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
  const categories = ['Politics', 'Economy', 'Education', 'Health', 'Infrastructure', 'Technology', 'Environment', 'Social Welfare', 'Other'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Other'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await newsService.getAll({ limit: 100 });
      setNews(res.data.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await newsService.update(editingId, formData);
        setSuccess('News story updated successfully!');
      } else {
        await newsService.create(formData);
        setSuccess('News story created successfully!');
      }
      resetForm();
      fetchNews();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save news story');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem._id);
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      content: newsItem.content,
      region: newsItem.region,
      category: newsItem.category,
      language: newsItem.language,
      author: newsItem.author,
      sourceUrl: newsItem.sourceUrl || '',
      publishDate: newsItem.publishDate.split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news story?')) {
      try {
        await newsService.delete(id);
        setSuccess('News story deleted successfully!');
        fetchNews();
      } catch (error) {
        setError('Failed to delete news story');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      region: 'North',
      category: 'Politics',
      language: 'English',
      author: '',
      sourceUrl: '',
      publishDate: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage News Stories</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Add New Story
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? 'Edit' : 'Add'} News Story</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                rows="8"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Region *</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  required
                >
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Language *</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  required
                >
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Publish Date *</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Source URL</label>
              <input
                type="url"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Create'} Story
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading news stories...</div>
      ) : (
        <div className="news-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Region</th>
                <th>Category</th>
                <th>Language</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map(item => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.region}</td>
                  <td>{item.category}</td>
                  <td>{item.language}</td>
                  <td>{new Date(item.publishDate).toLocaleDateString()}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
