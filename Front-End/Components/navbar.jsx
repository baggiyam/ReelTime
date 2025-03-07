import { NavLink, useLocation } from "react-router-dom";
import "../Styles/index.css"; // Ensure your CSS file is correctly imported
import logo from "../images/Logo.jpeg";

function Navbar({ searchTerm, onSearchChange }) {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname === '/movies' || location.pathname === '/';

    return (
        <nav id="main-navbar">
            {/* Logo as a NavLink */}
            <NavLink to="/" className="logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </NavLink>

            {/* Navigation Links */}
            <div className="nav-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/signup" className="nav-link">Signup</NavLink>
                <NavLink to="/movielist" className="nav-link">MovieList</NavLink>
            </div>

            {/* Conditional Search Bar */}
            {shouldShowSearchBar && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="search-input"
                    />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
