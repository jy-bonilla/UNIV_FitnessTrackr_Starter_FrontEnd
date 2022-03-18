import React, { useState } from "react";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCon, setPasswordCon] = useState('');

    const handleSubmit = (event) => {

        //prevents page from being submitted
        event.preventDefault()
        // console.log('username: ', username);
        // console.log('password: ', password);
        // console.log('passwordCon:', passwordCon)

        //checks to make sure password and passwordConfirmation match => fetch call else deny fetch call
        if (password !== passwordCon) {
            alert("Passwords don't match!");
        } else {


            //Register a user by submitting form info to POST /api/COHORT-NAME/users/register

            fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                    // saves the token from the api to a const and saves it on localStorage
                    const { token } = result.data;
                    localStorage.setItem('token', token);

                })
                .catch(console.error);
        }
    }

    return (
        <div className="navbar-container" id='container'>
            <div className="navbar-register" id='navbar'>
                <h2>Register New Account</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' required name='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input type='password' required minLength='4' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <label htmlFor='password-confirm'>Confirm Password:</label>
                <input type='password' required minLength='4' name='password-confirm' value={passwordCon} onChange={(event) => setPasswordCon(event.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}



export default Register;