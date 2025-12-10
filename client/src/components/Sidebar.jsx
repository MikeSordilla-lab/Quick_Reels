import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">Quick Reels</h2>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </Link>

        {isAuthenticated && (
          <Link to="/upload" className="nav-item">
            <span className="nav-icon">⬆️</span>
            <span className="nav-text">Upload</span>
          </Link>
        )}
      </nav>

      <div className="sidebar-footer">
        {isAuthenticated ? (
          <>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <div className="user-name">{user?.username}</div>
                <div className="user-email">{user?.email || 'No email'}</div>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
