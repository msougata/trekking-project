// src/ResetPasswordPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { confirmPasswordReset } from './utils/api';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // If email is not passed from the previous page, let user enter it
    if (!email) {
      console.log("No email found in state, allowing manual entry");
    }
  }, [email]);

  const validateForm = () => {
    setError('');
    
    if (!email) {
      setError("Email is required");
      return false;
    }
    
    if (!otp) {
      setError("OTP is required");
      return false;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log("Submitting password reset with:", { email, otp, newPassword: "***" });
      const response = await confirmPasswordReset(email, otp, newPassword);
      
      console.log("Password reset successful:", response);
      setSuccess("Password reset successful! You will be redirected to login.");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setError(error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Reset Password</h2>
                <p className="text-secondary">Enter the OTP sent to your email and create a new password</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={!!location.state?.email}
                  />
                  {!location.state?.email && (
                    <Form.Text className="text-muted">
                      Enter the email you used for the password reset request
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>OTP Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP code from your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 8 characters long
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Reset Password"}
                </Button>

                <div className="d-flex justify-content-between">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Request new OTP
                  </Link>
                  <Link to="/login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}