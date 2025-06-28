import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              🌸 GlowNest
            </Link>
          </div>
          
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </div>

          <div className="navbar-actions">
            <Link to="/cart" className="cart-icon">
              <svg className="cart-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="user-menu">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                  <svg className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="user-dropdown">
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="dropdown-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button 
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      <svg className="dropdown-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary auth-btn">
                  Sign Up
                </Link>
              </div>
            )}
            
            <div className="mobile-menu">
              <button className="mobile-menu-btn">
                <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
