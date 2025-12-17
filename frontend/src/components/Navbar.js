import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          360° GOI Feedback
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/news" className="navbar-link">News Stories</Link>
          </li>
          
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <Link to="/my-feedback" className="navbar-link">My Feedback</Link>
              </li>
              {isAdmin && (
                <>
                  <li className="navbar-item">
                    <Link to="/admin/news" className="navbar-link">Manage News</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/admin/analytics" className="navbar-link">Analytics</Link>
                  </li>
                </>
              )}
            </>
          )}
          
          {!isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <button onClick={handleLogout} className="navbar-link navbar-btn">
                Logout ({user?.name})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
