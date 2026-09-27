import { useState, useContext } from "react";
import { login } from "./utils/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function LoginPage() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      // Login attempt
      console.log("Attempting login with:", cred);
      await login(cred);
      
      // Check if we're authenticated after login attempt
      console.log("Login API call completed, checking auth status");
      const isAuthenticated = await checkAuth();
      console.log("Auth status check result:", isAuthenticated);

      if (isAuthenticated) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError("Login appeared successful, but authentication check failed. Please try again.");
      }
    } catch (error) {
      console.error("Login process failed:", error);
      setError(error.message || "Login failed. Please check your credentials or contact support.");
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
                <h2 className="fw-bold text-primary">Login</h2>
                <p className="text-secondary">Welcome back! Please enter your details.</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={cred.email}
                    onChange={e => setCred({ ...cred, email: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={cred.password}
                    onChange={e => setCred({ ...cred, password: e.target.value })}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    id="remember-me"
                  />
                  <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/signup" className="text-decoration-none">Sign up</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}