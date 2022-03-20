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
                <Link to="/activities">Activities</Link>
                {signedIn ? <Link to="/SigOut" onClick={handleLogOut}>SignOut</Link> : <Link to="/SignIn">SignIn</Link>}
            </div>
        </nav>
    );
}
export default Navbar;