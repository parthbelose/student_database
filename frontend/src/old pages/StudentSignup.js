import React, { useState } from 'react';
import './styles.css'; // Ensure you have your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Directly setting the role to 'student' as this is the student signup form
            const response = await axios.post('http://localhost:3001/signup', {
                email,
                password,
                role: 'student',
            });
            console.log(response.data); // For debugging purposes
            if (response.data.success) {
                alert('Signup successful. You can now login.');
                navigate('/studentlogin'); // Redirect to student login page after successful signup
            } else {
                alert(response.data.message); // Display error message from server
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

            <form onSubmit={handleSubmit}> {/* Modified to call handleSubmit on form submission */}
                <div className="card">
                    <h1>Create Student Account</h1> <br /><br />

                    <label htmlFor="email"> </label>
                    <input
                        type="email"
                        className="input-box"
                        placeholder="Email"
                        id="email"
                        value={email} // Bind state to input
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                        required
                    /><br /><br />

                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        className="input-box"
                        placeholder="Create password"
                        id="password"
                        value={password} // Bind state to input
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                        required
                    /><br /><br />

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
}

export default StudentSignup;