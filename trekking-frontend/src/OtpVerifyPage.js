// src/OtpVerifyPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from './utils/api';

export default function OtpVerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  // Get email from location state, if available (e.g., from signup)
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Email not provided. Please go back to sign up.');
      return;
    }

    try {
      const response = await verifyOtp({ email, otp });
      if (response.status === 200) {
        setMessage("OTP verified successfully! You can now log in.");
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      if (err.response) {
        setError(err.response.data || 'OTP verification failed. Please try again.');
      } else {
        setError('Network error or server unavailable. Please try again later.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px' }}>
      <h2>Verify OTP</h2>
      {email && <p>Verifying OTP for: <strong>{email}</strong></p>}
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="otpInput" className="form-label">OTP</label>
          <input
            type="text"
            className="form-control"
            id="otpInput"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6" // Assuming 6-digit OTP
            placeholder="Enter OTP"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
}