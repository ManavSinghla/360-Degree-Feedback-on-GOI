import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import MyFeedback from './pages/MyFeedback';
import AdminNews from './pages/AdminNews';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route 
              path="/my-feedback" 
              element={
                <PrivateRoute>
                  <MyFeedback />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/news" 
              element={
                <PrivateRoute adminOnly={true}>
                  <AdminNews />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <PrivateRoute adminOnly={true}>
                  <Analytics />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
