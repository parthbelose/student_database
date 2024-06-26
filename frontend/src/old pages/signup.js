import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { loginSuccess } from '../redux/features/authSlice'; // Import loginSuccess action
import axios from "axios";

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Initialize role state with default value
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post('http://localhost:3001/signup', { email, password, role }); // Include role in the request
      console.log(data);
    if (data.success) { 
        alert(data.message);
        localStorage.setItem("userId", email);
        // Dispatch loginSuccess action with the user data
        dispatch(loginSuccess({ user: email, isAuthenticated: true }));
        navigate('/login');
      } else { 
        alert(data.message); 
      }
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div
      id='signuppp'
      style={{
        minHeight: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <>
        <Container
          className=" d-flex justify-content-center align-items-center "
          style={{ minHeight: '100vh' }}
        >
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Card className="row border rounded-5 p-3 bg-white shadow box-area">
              <Card.Body>
                <p className="text-center mb-4"><h2>Hi there!! </h2>We are happy to see you</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </Form.Select>
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" className="b">
                      Sign up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer>
                <div className="w-100 text-center mt-2">
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Container>
      </>
    </div>
  );
};
