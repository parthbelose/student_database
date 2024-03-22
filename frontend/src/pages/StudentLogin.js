import React, { useState } from 'react';
import './styles.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        try {
            // Perform a POST request to your login endpoint
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password,
                role: 'student', // Specify the role if your API requires it
            });
            
            // Check if login is successful based on your response schema
            if (response.data.success) {
                console.log('Login successful');
                // Redirect or perform actions after successful login
                navigate('/'); // Example redirect, adjust according to your needs
            } else {
                alert('Login failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <h1>Login to Student Account</h1> <br /><br />

                <input 
                    type="email" 
                    className="input-box" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                /><br /><br />

                <input 
                    type="password" 
                    className="input-box" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                /><br /><br />

                <button id="submit" className="input-box" type="submit">Log In</button><br /><br />

                <div className="form">
                    Don't have an account? <Link to="/studentsignup">Sign in</Link>
                </div>
            </div>
        </form>
    );
}

export default StudentLogin;
