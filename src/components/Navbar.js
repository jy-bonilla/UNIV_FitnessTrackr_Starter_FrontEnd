// import { Link } from 'react-router-dom';

// const Navbar = () => {
    
//     return (
//         <nav className="navbar">
//             <h1>FitnessTracker</h1>
//             <div className="links">
//                 <Link to="/">Home</Link>
//                 <Link to="/routines">Routines</Link>
//                 <Link to="/MyRoutines">My Routines</Link>
//                 <Link to="/Login">SignIn</Link>
//                 <Link to="/Logout">SignOut</Link>
//             </div>
//         </nav>
//     );
// }
// export default Navbar;

   
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = (props) => {
    const setSignedIn = props.setSignedIn
    const signedIn = props.signedIn
    const handleLogOut = (event) => {
        event.preventDefault()
        setSignedIn(false)
        localStorage.removeItem("token")
    }

    return (
        <nav className="navbar">
            <h1>FitnessTracker</h1>
            <div className="links">
            <Link to="/">Home</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/routines">Routines</Link>
            <Link to="/MyRoutines">My Routines</Link>
            {signedIn ? <Link to="/signout" onClick={handleLogOut}>SignOut</Link> : <Link to="/signin">SignIn</Link>}
            </div>
        </nav>
    );
}
export default Navbar;