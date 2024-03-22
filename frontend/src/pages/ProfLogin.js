import React, { useState } from 'react';
import './styles.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password,
                role: 'teacher', // Set role to 'teacher' for professor login
            });
            // Assuming your response has a 'success' property to indicate successful login
            if (response.data.success) {
                // Perform actions after successful login, e.g., redirect
                console.log('Login successful');
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <h1>Login to Professor Account</h1>
                <br /><br />

                <label htmlFor="email"></label>
                <input 
                    type="email" 
                    className="input-box" 
                    placeholder="Email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br /><br />

                <label htmlFor="password"></label>
                <input 
                    type="password" 
                    className="input-box" 
                    placeholder="Create password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br /><br />

                <button className="input-box" type="submit">Log In</button><br /><br />

                <div className="form">
                    Don't have an account? <Link to="/profsignup">Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default ProfLogin;
