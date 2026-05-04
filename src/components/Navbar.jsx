import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen className="icon" />
          <span>Tech Academy</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Courses</Link>
          {token ? (
            <>
              <Link to="/my-courses" className="nav-link">My Courses</Link>
              <button onClick={handleLogout} className="btn-logout">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
