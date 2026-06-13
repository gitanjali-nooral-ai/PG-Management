import React, { useState, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import './LoginPage.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load saved email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('pgEmail');
    if (savedEmail) {
      setLoginData((prev) => ({
        ...prev,
        email: savedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setLoginData((prev) => ({ ...prev, [name]: fieldValue }));
    if (error) setError('');
  };

  const validateEmail = (email) => emailRegex.test(email);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    if (!loginData.email.trim() || !loginData.password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (!validateEmail(loginData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (loginData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Save email if remember me is checked
      if (loginData.rememberMe) {
        localStorage.setItem('pgEmail', loginData.email);
      } else {
        localStorage.removeItem('pgEmail');
      }

      // Mock successful login
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      localStorage.setItem('pgToken', 'mock_token_' + Date.now());
      
      // In production, replace with real API:
      // const response = await loginUser(loginData);
      // localStorage.setItem('pgToken', response.token);
      // window.location.href = '/dashboard';
      
      setTimeout(() => {
        // Redirect to dashboard (or role selection page)
        window.location.href = '/dashboard';
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }

    if (!validateEmail(forgotEmail)) {
      setForgotError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      // Replace with real password reset API call
      // await sendPasswordReset(forgotEmail);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setForgotSuccess('Password reset link sent to your email!');
      setTimeout(() => setShowForgotPassword(false), 2000);
    } catch (err) {
      setForgotError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Header Section */}
          <div className="login-card-header">
            <div className="pg-logo">
              <span className="logo-icon">🏢</span>
              <h1>PG Management</h1>
            </div>
            <p className="tagline">Professional Paying Guest Management System</p>
          </div>

          {/* Title & Toggle */}
          <div className="login-header">
            <h2>{isRegistering ? 'Create an Account' : 'Sign In'}</h2>
            {!isRegistering && (
              <button
                type="button"
                className="toggle-button"
                onClick={() => setIsRegistering(true)}
              >
                New user? Register
              </button>
            )}
          </div>

          {/* Registration Form */}
          {isRegistering ? (
            <RegisterForm onRegistered={() => setIsRegistering(false)} />
          ) : (
            /* Simple Login Form */
            <>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                {/* Email Input */}
                <div className="form-group">
                  <label htmlFor="email">Username / Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Password Input */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-group checkbox-group">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && <div className="error-message" role="alert">{error}</div>}

                {/* Success Message */}
                {successMessage && <div className="success-message" role="alert">{successMessage}</div>}

                {/* Login Button */}
                <button
                  type="submit"
                  className="primary-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'LOGIN'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForgotPassword(false)}
                disabled={isLoading}
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="forgot-form">
              <p className="modal-description">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <div className="form-group">
                <label htmlFor="forgotEmail">Email Address</label>
                <input
                  id="forgotEmail"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    setForgotError('');
                  }}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  required
                  autoComplete="email"
                />
              </div>

              {forgotError && <div className="error-message" role="alert">{forgotError}</div>}
              {forgotSuccess && <div className="success-message" role="alert">{forgotSuccess}</div>}

              <button
                type="button"
                className="primary-button"
                disabled={isLoading}
                onClick={handleForgotPassword}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
