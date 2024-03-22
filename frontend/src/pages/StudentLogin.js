import React, { useEffect } from 'react';
import './styles.css'; // Import your CSS file

function StudentLogin() {
    // useEffect(() => {
    //     const submit = document.getElementById('submit');
    //     submit.addEventListener("click", function (event) {
    //         event.preventDefault()
    //         const auth = getAuth();

    //         //inputs
    //         const email = document.getElementById('email').value;
    //         const password = document.getElementById('password').value;

    //         signInWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 // Signed in
    //                 const user = userCredential.user;
    //                 alert("Login Successful")
    //                 window.location.href = "Dashboard.html";
    //                 // ...
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //                 alert(errorMessage)
    //                 // ..
    //             });
    //     });
    // }, []);

    return (
        <form>
            <div className="card">
                <h1>Login to Student Account</h1> <br /><br />

                <label htmlFor="email"> </label>
                <input type="email" className="input-box" placeholder="Email" id="email" required /><br /><br />

                <label htmlFor="password"></label>
                <input type="password" className="input-box" placeholder="Create password" id="password" required /><br /><br />

                {/* <label htmlFor="cpassword"></label>
                <input type="cpassword" placeholder="Confirm password" id="cpassword" required /><br /><br /> */}

                <button id="submit" className="input-box" type="submit">Log In</button><br /><br />

                <div className="form">
                    <p>Don't have an account?
                        <span><a className="glow-text" href="StudentSignup.html">Signup here</a></span>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default StudentLogin;
