import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="error-container">
            <h2>Please log in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-section">
              <h2 className="section-title">Account Information</h2>
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="profile-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Account Type:</span>
                    <span className="info-value">{user.role}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Member Since:</span>
                    <span className="info-value">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="profile-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2 className="section-title">Account Actions</h2>
              <div className="action-buttons">
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 