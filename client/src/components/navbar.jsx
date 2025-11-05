//Navbar.jsx - Navigation bar component

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Navbar render - auth state:', { isAuthenticated, user });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          📝 MERN Blog
        </Link>

        <ul className="nav-links">
          {/* TEMP DEBUG: show auth state in UI to help debugging (remove later) */}
          <li style={{ color: 'white', fontSize: '0.9rem', marginRight: '0.5rem' }}>
            Auth: {isAuthenticated ? 'true' : 'false'}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/posts/create" className="create-post-link" style={{
                  background: '#27ae60',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  ✍️ Create Post
                </Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <span className="user-name" style={{ fontWeight: 'bold' }}>
                  👤 {user?.name || 'User'}
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="btn-logout"
                  style={{
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn-register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;