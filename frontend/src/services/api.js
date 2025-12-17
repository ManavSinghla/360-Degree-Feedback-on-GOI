import axios from 'axios';

const API_URL = '/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth services
export const authService = {
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  getMe: () => axios.get(`${API_URL}/auth/me`, { headers: getAuthHeader() })
};

// News services
export const newsService = {
  getAll: (params) => axios.get(`${API_URL}/news`, { params }),
  getById: (id) => axios.get(`${API_URL}/news/${id}`),
  create: (data) => axios.post(`${API_URL}/news`, data, { headers: getAuthHeader() }),
  update: (id, data) => axios.put(`${API_URL}/news/${id}`, data, { headers: getAuthHeader() }),
  delete: (id) => axios.delete(`${API_URL}/news/${id}`, { headers: getAuthHeader() })
};

// Feedback services
export const feedbackService = {
  create: (data) => axios.post(`${API_URL}/feedback`, data, { headers: getAuthHeader() }),
  getByNews: (newsId) => axios.get(`${API_URL}/feedback/news/${newsId}`),
  getMyFeedback: () => axios.get(`${API_URL}/feedback/my-feedback`, { headers: getAuthHeader() }),
  update: (id, data) => axios.put(`${API_URL}/feedback/${id}`, data, { headers: getAuthHeader() }),
  delete: (id) => axios.delete(`${API_URL}/feedback/${id}`, { headers: getAuthHeader() })
};

// Analytics services
export const analyticsService = {
  getDashboard: (params) => axios.get(`${API_URL}/analytics/dashboard`, {
    params,
    headers: getAuthHeader()
  }),
  getTrends: (params) => axios.get(`${API_URL}/analytics/trends`, {
    params,
    headers: getAuthHeader()
  })
};
