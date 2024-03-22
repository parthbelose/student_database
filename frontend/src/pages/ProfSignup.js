import React, { useEffect } from 'react';
import './styles.css'; // Import your CSS file
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth functions from Firebase
import { Link , useNavigate } from 'react-router-dom';
function ProfSignup() {
    useEffect(() => {
        const submit = document.getElementById('submit');
        submit.addEventListener("click", function (event) {
            event.preventDefault();
            const auth = getAuth();

            //inputs
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    alert("Account Created");
                    window.location.href = "ProfLogin.html";
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                    // ..
                });
        });
    }, []);

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form>
                <div className="card">
                    <h1>Create Professor Account</h1> <br /><br />

                    <label htmlFor="email"></label>
                    <input type="email" className="input-box" placeholder="Email" id="email" required /><br /><br />

                    <label htmlFor="password"></label>
                    <input type="password" className="input-box" placeholder="Create password" id="password" required /><br /><br />

                    {/* <label htmlFor="cpassword"></label>
                    <input type="cpassword" placeholder="Confirm password" id="cpassword" required /><br /><br /> */}

                    <button id="submit" className="input-box" type="submit">Create Account</button><br /><br />

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
