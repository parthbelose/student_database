import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { loginSuccess } from '../redux/features/authSlice'; // Import loginSuccess action
import axios from "axios";

export const StudentSignup = () => {
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
        navigate('/studentlogin');
      } else { 
        alert(data.message); 
      }
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h1>Create Student Account</h1> <br /><br />

          <label htmlFor="email"> </label>
          <input 
            type="email" 
            className="input-box" 
            placeholder="Email" 
            id="email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          /><br /><br />

          <label htmlFor="password"></label>
          <input 
            type="password" 
            className="input-box" 
            placeholder="Create password" 
            id="password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          /><br /><br />

          {/* <label htmlFor="cpassword"></label>
          <input type="cpassword" placeholder="Confirm password" id="cpassword" required /><br /><br /> */}

          <button id="submit" className="input-box" type="submit">Create Account</button><br /><br />

          <div className="form">
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/studentlogin">Log in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentSignup;
