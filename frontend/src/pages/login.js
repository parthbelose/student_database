import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice"; // Import the login action creator

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      if (data.success) {
        alert(data.message);
        localStorage.setItem("userId", email);
        dispatch(loginSuccess()); // Dispatch the login action
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <>
        <Container
          className=" d-flex justify-content-center align-self-center "
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card
              className="row border rounded-5 p-3 shadow box-area"
              style={{
                backgroundColor: '#F6F6F6'
              }}
            >
              <Card.Body>
                <p className="text-center mb-4">
                  <h2>Welcome back!</h2> We are happy to see you
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      className="b"
                    >
                      Log in
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer>
                <div className="w-100 text-center mt-2">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Container>
      </>
    </div>
  );
};
