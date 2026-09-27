import { useState, useEffect, useContext } from "react";
import { signup } from "./utils/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const { data } = await signup(form);
      navigate("/verify", { state: { email: form.email } });
    } catch(err) {
      setError(err.response?.data || "Signup failed. Please try again.");
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
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-secondary">Join us to start your trekking adventure</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 8 characters long
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-decoration-none">Login</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}