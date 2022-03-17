import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>FitnessTracker</h1>
            <div className="links">
                <Link to="/Login">SignIn</Link>
                <Link to="/Logout">SignOut</Link>
            </div>
        </nav>
    );
}
export default Navbar;