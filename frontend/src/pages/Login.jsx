// Login.jsx

import React from 'react';
import './styles.css';
function Login() {
    return (
        <div className="card-login">
            {/* <div className="image-container">
                <img src="../img/login.png" alt="Login" height="50%" width="50%" />
            </div> */}
            {/* idk */}
            <div >
                <h3>Login As?</h3><br/><br/>
                <a href="StudentLogin.html"><button className="input-box">Student</button></a><br/><br/><br/>
                <a href="ProfLogin.html"><button className="input-box">Professor</button></a><br/><br/>
            </div>
        </div>
    );
}

export default Login;
