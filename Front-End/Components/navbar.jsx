import { NavLink, useLocation } from "react-router-dom";
import "../Styles/index.css";
import logo from "../images/Logo.jpeg"

function Navbar({ searchTerm, onSearchChange }) {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname === '/animalList';

    return (
        <nav id="main-navbar">
            {/* Logo as a NavLink */}
            <NavLink to="/" className="logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </NavLink>

            {/* Navigation Links */}
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link">Signup</NavLink>


        </nav>
    );
}


export default Navbar;
