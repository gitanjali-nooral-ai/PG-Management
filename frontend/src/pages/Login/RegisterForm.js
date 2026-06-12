import React, { useState } from 'react';
import './LoginPage.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

const SECURITY_QUESTIONS = [
  'What is your pet\'s name?',
  'What city were you born in?',
  'What is your mother\'s maiden name?',
  'What is your favorite movie?',
  'What was the name of your first school?',
];

const BUILDINGS = [
  { id: 1, name: 'Alpha House' },
  { id: 2, name: 'Beta Residency' },
  { id: 3, name: 'Gamma Plaza' },
  { id: 4, name: 'Delta Mansion' },
  { id: 5, name: 'Epsilon Tower' },
];

const RESIDENT_ROLES = [
  { value: 'resident', label: 'Resident' },
  { value: 'manager', label: 'Building Manager' },
];

function RegisterForm({ onRegistered }) {
  const [step, setStep] = useState('details'); // 'details', 'security', 'verify'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'resident',
    buildingId: '',
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verifyingEmail, setVerifyingEmail] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.buildingId) {
      newErrors.buildingId = 'Please select a building.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain letters and numbers.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const validateSecurityInfo = () => {
    const newErrors = {};

    if (!formData.securityQuestion) {
      newErrors.securityQuestion = 'Please select a security question.';
    }

    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = 'Please answer the security question.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions.';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('security');
  };

  const handleSecuritySubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateSecurityInfo();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Send verification email/SMS
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVerifyingEmail(formData.email);
      setStep('verify');
    } catch (err) {
      setErrors({ submit: err.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setOtpError('');

    if (!otp.trim()) {
      setOtpError('Please enter the OTP code.');
      return;
    }

    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits.');
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP and complete registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (typeof onRegistered === 'function') {
        onRegistered();
      }
    } catch (err) {
      setOtpError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOtpError('');
    } catch (err) {
      setOtpError('Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {step === 'details' ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={isLoading}
              required
              autoComplete="name"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={isLoading}
              required
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              maxLength="10"
              disabled={isLoading}
              required
              autoComplete="tel"
            />
            <small className="field-hint">Format: 10 digits (e.g., 9876543210)</small>
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Registration Type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              {RESIDENT_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="buildingId">Select Building</label>
            <select
              id="buildingId"
              name="buildingId"
              value={formData.buildingId}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              <option value="">Choose a building</option>
              {BUILDINGS.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
            {errors.buildingId && <span className="field-error">{errors.buildingId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters with letters and numbers"
                disabled={isLoading}
                required
                autoComplete="new-password"
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
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <div className="error-message" role="alert">{errors.submit}</div>}

          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      ) : step === 'security' ? (
        <form className="login-form" onSubmit={handleSecuritySubmit}>
          <h3 className="step-title">Security Information</h3>

          <div className="form-group">
            <label htmlFor="securityQuestion">Security Question</label>
            <select
              id="securityQuestion"
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              {SECURITY_QUESTIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            {errors.securityQuestion && <span className="field-error">{errors.securityQuestion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="securityAnswer">Answer</label>
            <input
              id="securityAnswer"
              name="securityAnswer"
              type="text"
              value={formData.securityAnswer}
              onChange={handleChange}
              placeholder="Your answer"
              disabled={isLoading}
              required
            />
            {errors.securityAnswer && <span className="field-error">{errors.securityAnswer}</span>}
          </div>

          <div className="form-group checkbox-group">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}

          {errors.submit && <div className="error-message" role="alert">{errors.submit}</div>}

          <div className="button-group">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setStep('details')}
              disabled={isLoading}
            >
              Back
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Next'}
            </button>
          </div>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleVerifyOtp}>
          <div className="verification-container">
            <h3 className="verification-title">Verify Your Registration</h3>
            <p className="verification-text">
              We've sent a verification code to <strong>{verifyingEmail}</strong>
            </p>

            <div className="form-group">
              <label htmlFor="otp">Enter 6-digit Code</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setOtpError('');
                }}
                placeholder="000000"
                maxLength="6"
                disabled={isLoading}
                required
                className="otp-input"
              />
              {otpError && <span className="field-error">{otpError}</span>}
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Complete Registration'}
            </button>

            <button
              type="button"
              className="resend-link"
              onClick={handleResendOtp}
              disabled={isLoading}
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default RegisterForm;
