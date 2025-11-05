import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePost = () => {
    navigate('/posts/create');
  };

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand" onClick={() => navigate('/')}>
          Blog Platform
        </div>
        
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <button className="nav-button create-post" onClick={handleCreatePost}>
                Create Post
              </button>
              <div className="user-info">
                Welcome, {user.name}!
              </div>
              <button className="nav-button logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="nav-button" onClick={() => navigate('/register')}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;