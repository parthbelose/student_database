// StudentLogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email and password in the request payload
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      if (data.success) {
        alert(data.message);
        localStorage.setItem('userId', email);
        localStorage.setItem('role', 'student'); // Set role as 'student' for student login
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
    <form onSubmit={handleSubmit}>
      <div className="card">
        <h1>Login to Student Account</h1>
        <br /><br />

        <label htmlFor="email"></label>
        <input type="email" className="input-box" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

        <label htmlFor="password"></label>
        <input type="password" className="input-box" placeholder="Create password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />

        <button className="input-box" type="submit">Log In</button><br /><br />

        <div className="form">
          Don't have an account? <Link to="/studentsignup">Sign up</Link>
        </div>
      </div>
    </form>
  );
}

export default StudentLogin;
