import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = (props) => {
    const setSignedIn = props.setSignedIn
    const signedIn = props.signedIn
    const setSelectedActivity = props.setSelectedActivity
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
                <Link to="/routines">All Routines</Link>
                {signedIn ? <Link to="/myroutines">My Routines</Link> : <></>}
                {signedIn ? <Link to="/signout" onClick={handleLogOut}>Sign Out</Link> : <Link to="/signin">Sign In</Link>}
            </div>
        </nav>
    );
}
export default Navbar;