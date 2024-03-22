import React, { useEffect } from 'react';
import './styles.css'; // Import your CSS file

function StudentSignup() {
    // useEffect(() => {
    //     const submit = document.getElementById('submit');
    //     submit.addEventListener("click", function (event) {
    //         event.preventDefault()
    //         const auth = getAuth();

    //         //inputs
    //         const email = document.getElementById('email').value;
    //         const password = document.getElementById('password').value;

    //         createUserWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 // Signed up 
    //                 const user = userCredential.user;
    //                 alert("Account Created")
    //                 window.location.href = "StudentLogin.html";
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
                        <p>Have an account?
                            <span><a className="glow-text" href="StudentLogin.html">Login here</a></span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default StudentSignup;
