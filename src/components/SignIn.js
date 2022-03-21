import React, { useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";


const SignIn = (props) => {
    const setSignedIn = props.setSignedIn
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        //prevents page from being submitted
        event.preventDefault()
        // console.log('username: ', username);
        // console.log('password: ', password);

        const loginInfo = {
            username: username,
            password: password
        }

        //Register a user by submitting form info to POST /users/register
        const results = await callApi({ url: "/users/login", method: "POST", body: loginInfo })
        console.log(results.token)
        setUsername("")
        setPassword("")
        if (results) {
            setSignedIn(true)
        }
        localStorage.setItem("token", results.token)
        if (results.token === undefined) {
            alert('You have entered an invalid username or password')
        } else (alert('You have successfully SignIn. Welcome!'))
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
            <Link to="/register">Don't have an account yet? Register today!</Link>
        </div>
    )
}
export default SignIn;