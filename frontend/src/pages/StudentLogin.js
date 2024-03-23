import React, { useState } from 'react';
// Import useDispatch from react-redux
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
// Import your loginSuccess action
import { loginSuccess } from '../redux/features/authSlice'; // Adjust the import path as necessary

function StudentLogin() {
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
                role: 'student',
            });
            
            if (response.data.success) {
                console.log('Login successful');
                const { user } = response.data; 
                dispatch(loginSuccess(user));
                console.log(response.data);
                localStorage.setItem("userId", user.email); 
                localStorage.setItem("role", user.role); 
                localStorage.setItem("id", user.id); 
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
