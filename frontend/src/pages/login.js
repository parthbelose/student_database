import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login (replace with actual API call or authentication logic)
    if (email === 'a@a' && password === 'a') {
      setErrorMessage(''); // Clear any previous error messages
      navigate('/'); // Redirect to home page on successful login (replace with desired route)
    } else {
      setErrorMessage('Invalid email or password'); // Set error message
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        // backgroundImage: `url(${backgim})`, // Remove background image if not desired
        backgroundSize: 'cover',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card className="row border rounded-5 p-3 shadow box-area" style={{ backgroundColor: '#F6F6F6' }}>
            <Card.Body>
              <p className="text-center mb-4">
                <h2>Welcome back!</h2> We are happy to see you
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    id="email" // Added for accessibility
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password" // Added for accessibility
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" className="b">Log in</Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="w-100 text-center mt-2">
                Don't have account? <Link to="/signup">Sign up</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;
