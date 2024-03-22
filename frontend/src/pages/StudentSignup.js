import React, { useEffect } from 'react';
import './styles.css'; // Import your CSS file
import { Link , useNavigate } from 'react-router-dom';
function StudentSignup() {
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form>
                <div className="card">
                    <h1>Create Student Account</h1> <br /><br />

                    <label htmlFor="email"> </label>
                    <input type="email" className="input-box" placeholder="Email" id="email" required /><br /><br />

                    <label htmlFor="password"></label>
                    <input type="password" className="input-box" placeholder="Create password" id="password" required /><br /><br />

                    {/* <label htmlFor="cpassword"></label>
                    <input type="cpassword" placeholder="Confirm password" id="cpassword" required /><br /><br /> */}

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
