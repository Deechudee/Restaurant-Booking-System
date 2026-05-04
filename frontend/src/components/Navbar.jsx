import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            VenusHub <span className="logo-emoji">🍽️</span>
          </Link>
        </h2>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/booking" className="nav-link" onClick={() => setMobileOpen(false)}>
            Book Table
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/my-bookings" className="nav-link">
                My Bookings
              </Link>
              <span className="user-greeting">Hi, {user?.name || 'User'}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMobile}>
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`nav-links-mobile ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/booking" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
            Book Table
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
              <Link to="/my-bookings" className="nav-link-mobile" onClick={() => setMobileOpen(false)}>
                My Bookings
              </Link>
              <span className="user-greeting-mobile">Hi, {user?.name || 'User'}</span>
              <button onClick={handleLogout} className="logout-btn-mobile">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

