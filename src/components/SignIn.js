import React, { useState } from "react";
import { Link } from "react-router-dom";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {

        //prevents page from being submitted
        event.preventDefault()
        // console.log('username: ', username);
        // console.log('password: ', password);

        //Register a user by submitting form info to POST /api/COHORT-NAME/users/register

        fetch('https://fitnesstrac-kr.herokuapp.com/api/2110-vpi-web-pt-resources/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(console.error);
    }

    return (
        <div className="navbar-container" id='container'>
            <div className="navbar-register" id='navbar'>
                <h2>LOG IN</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' required name='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input type='password' required minLength='4' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type='submit'>Log In</button>
            </form>
            <Link to="/Register">Don't have an account yet? Register today!</Link>
        </div>
    )
}
export default SignIn;