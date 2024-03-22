import React from 'react';
import './styles.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const navigate = useNavigate(); // Initialize navigate function

    const redirectToStudentLogin = () => {
        navigate('/studentlogin'); // Navigate to Student Login page
    };

    const redirectToProfessorLogin = () => {
        navigate('/proflogin'); // Navigate to Professor Login page
    };

    return (
        <div classname="card">
            <button className="input-box" onClick={redirectToStudentLogin}>Student</button>
            <br /><br /><br />
            <button className="input-box" onClick={redirectToProfessorLogin}>Professor</button>
            <br /><br />
        </div>
    );
}

export default Login;
