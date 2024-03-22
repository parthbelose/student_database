// ProfLogin.jsx

import React from 'react';
import './styles.css'; // Import your CSS file
import { Link , useNavigate } from 'react-router-dom';
function ProfLogin() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        // You can handle form submission here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <h1>Login to Student Account</h1>
                <br /><br />

                <label htmlFor="email"></label>
                <input type="email" className="input-box" placeholder="Email" id="email" required /><br /><br />

                <label htmlFor="password"></label>
                <input type="password" className="input-box" placeholder="Create password" id="password" required /><br /><br />

                {/* <label htmlFor="cpassword"></label>
                <input type="cpassword" placeholder="Confirm password" id="cpassword" required /><br /><br /> */}

                <button className="input-box" type="submit">Log In</button><br /><br />

                <div className="form">
                
                  Don't have an account? <Link to="/profsignup">Sign in</Link>
                </div>
            </div>
        </form>
    );
}

export default ProfLogin;

