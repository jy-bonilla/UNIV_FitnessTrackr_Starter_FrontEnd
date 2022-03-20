import React, { useState } from "react";
import { callApi } from "../api";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCon, setPasswordCon] = useState('');

    const handleSubmit = async (event) => {

        //prevents page from being submitted
        event.preventDefault()
        const loginInfo = {
            username: username,
            password: password
        }
        // console.log('username: ', username);
        // console.log('password: ', password);
        // console.log('passwordCon:', passwordCon)

        //checks to make sure password and passwordConfirmation match => fetch call else deny fetch call
        if (password !== passwordCon) {
            alert("Passwords don't match!");
        } else {


            //Register a user by submitting form info to POST /api/COHORT-NAME/users/register
            const results = await callApi({ url: "/users/register", method: "POST", body: loginInfo })
            console.log(results)
            setPassword("")
            setPasswordCon("")
            if (!results.token) {
                alert('The username entered is invalid. Please try again.')
            } else if (results.token) {
                localStorage.setItem("token", results.token)
                alert('You have successfully Registered. Welcome!')
                setUsername("")
            }
            // .then(response => response.json())
            //         .then(result => {
            //             console.log(result);
            //             // saves the token from the api to a const and saves it on localStorage
            //             // const { token } = result.data;
            //             localStorage.setItem('token', results.token);
            //         })
            //         .catch(console.error);
            // }
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