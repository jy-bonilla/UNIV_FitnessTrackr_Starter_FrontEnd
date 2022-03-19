import React, { useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        //prevents page from being submitted
        event.preventDefault()
        const loginInfo = {
            username: username,
            password: password
        }
        // console.log('username: ', username);
        // console.log('password: ', password);

        //Register a user by submitting form info to POST /api/COHORT-NAME/users/register
        const results = await callApi({ url: "/users/login", method: "POST", body: loginInfo })
        console.log(results.token)
        localStorage.setItem("token", results.token)
        // const results = fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // }).then(response => response.json())

        //     .then(result => {
        //         console.log(result);
        //         localStorage.setItem("token", result.token)
        //     })
        //     .catch(console.error);

    }

    return (
        <div className="navbar-container" id='container'>
            <div className="navbar-register" id='navbar'>
                <h2>SignIn</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' required name='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input type='password' required minLength='4' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type='submit'>SignIn</button>
            </form>
            <Link to="/my-app/src/components/Register.js">Don't have an account yet? Register today!</Link>
        </div>
    )
}
export default SignIn;