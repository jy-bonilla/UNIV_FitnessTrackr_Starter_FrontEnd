// import React, { useState } from "react";
// import { Route } from "react-router";
// import { callAPI } from '../api';

// const Register = ({ setToken }) => {
//   const [ newUsername, setNewUsername ] = useState('');
//   const [ newPassword, setNewPassword ] = useState('');
//   const history = Route();

//   const handleRegisterSubmit = async (ev) => {
//     ev.preventDefault();

//     try {
//       const registerObj = await callAPI({
//         method: 'POST',
//         url: 'users/register',
//         body: {
//           username: `${newUsername}`,
//           password: `${newPassword}`
//         }
//       });

//       setNewUsername('');
//       setNewPassword('');

//       if (registerObj.token) {
//         setToken(registerObj.token);
//         history.push('/');
//       }

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return <div>
//     <h2 className='header'>Register</h2>
//     <form onSubmit={handleRegisterSubmit}>
//       <label htmlFor='new-username'>Username:</label>
//       <input placeholder='New Username' type='text' value={newUsername} onChange={
//         ev => setNewUsername(ev.target.value)
//       }></input>

//       <label htmlFor='new-password'>Password:</label>
//       <input placeholder='New Password' type='password' /*minLength='8'*/ value={newPassword} onChange={
//         ev => setNewPassword(ev.target.value)
//       }></input>

//       <button type='submit'>Register</button>
//     </form>
//   </div>
// }

// export default Register;