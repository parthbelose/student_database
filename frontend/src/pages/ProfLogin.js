// ProfLogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card,Container } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/features/authSlice'; // Import the login action creator

function ProfLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the email and password in the request payload
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      if (data.success) {
        alert(data.message);
        localStorage.setItem('userId', email);
        localStorage.setItem('role', 'teacher'); // Set role as 'teacher' for professor login
        dispatch(loginSuccess()); // Dispatch the login action
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card className="border rounded-5 p-3 shadow" style={{ backgroundColor: '#F6F6F6' }}>
            <Card.Body>
              <p className="text-center mb-4">
                <h2>Welcome back!</h2> We are happy to see you
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button type="submit" className="b">Log in</Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/profsignup">Sign up</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default ProfLogin;
