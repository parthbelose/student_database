import React, { useState } from 'react';
// Import useDispatch from react-redux
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
// Import your loginSuccess action
import { loginSuccess } from '../redux/features/authSlice'; // Adjust the import path as necessary

function ProfLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Initialize useDispatch
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password,
                role: 'teacher',
            });
            
            if (response.data.success) {
                console.log('Login successful');
                const { user, role } = response.data; // Assuming the role is available in response.data
                dispatch(loginSuccess(user));
                localStorage.setItem("userId", user.email); // Assuming user.email contains the email
                localStorage.setItem("role", role); 
                navigate('/');
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