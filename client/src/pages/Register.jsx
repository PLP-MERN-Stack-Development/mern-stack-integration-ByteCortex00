// Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await register(formData);
      console.log('Registration successful:', response);
      // Only navigate if we have a token, indicating successful registration
      if (response.token) {
        // Redirect to posts page after successful registration
        navigate('/posts');
      } else {
        setError('Registration successful but no authentication token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Handle different types of errors
      if (err.response?.data?.errors) {
        // Validation errors from backend
        setError(Object.values(err.response.data.errors).join(', '));
      } else if (err.response?.data?.message) {
        // Specific error message from backend
        setError(err.response.data.message);
      } else if (err.message) {
        // Client-side validation error or network error
        setError(err.message);
      } else {
        // Fallback error message
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>
        <p className="auth-subtitle">Create your account to start blogging!</p>

        {error && (
          <div className="error-message" role="alert">
            <strong>Registration Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label> {/* Keep as Name */}
            <input
              type="text"
              id="name"
              name="name" // Keep as 'name'
              value={formData.name}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Enter at least 6 characters"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;