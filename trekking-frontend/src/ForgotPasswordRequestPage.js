// src/ForgotPasswordRequestPage.js
import React, { useState } from 'react';
import { requestPasswordReset } from './utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function ForgotPasswordRequestPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log("Requesting password reset for:", email);
      const response = await requestPasswordReset(email);
      
      console.log("Password reset request successful:", response);
      setSuccess("OTP sent successfully! You will be redirected to reset your password.");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/reset-password', { state: { email: email } });
      }, 2000);
    } catch (error) {
      console.error("Password reset request failed:", error);
      setError(error.message || "Failed to request password reset. Please try again.");
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
                <h2 className="fw-bold text-primary">Forgot Password</h2>
                <p className="text-secondary">Enter your email to receive a password reset code</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll send an OTP code to this email address
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Request OTP"}
                </Button>

                <div className="text-center">
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