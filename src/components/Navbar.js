import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>FitnessTracker</h1>
            <div className="links">
                <Link to="/my-app/src/components/SignIn.js">SignIn</Link>
                <Link to="/my-app/src/components/SignOut.js">SignOut</Link>
            </div>
        </nav>
    );
}
export default Navbar;