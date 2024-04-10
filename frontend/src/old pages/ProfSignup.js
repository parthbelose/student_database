import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function ProfSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                email,
                password,
                role: 'teacher', // Set the role to 'teacher'
            });
            console.log(response.data);
            if (response.data.success) {
                alert('Account created successfully');
                navigate('/proflogin'); // Redirect to professor login page after successful signup
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
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
                    <h1>Create Professor Account</h1> <br /><br />

                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        className="input-box"
                        placeholder="Email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br /><br />

                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        className="input-box"
                        placeholder="Create password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />

                    <button className="input-box" type="submit">Create Account</button><br /><br />

                    <div className="form">
                        <div className="w-100 text-center mt-2">
                            Already have an account? <Link to="/proflogin">Log in</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProfSignup;
