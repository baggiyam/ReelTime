import { NavLink, useLocation } from "react-router-dom";
import "../Styles/index.css"; // Ensure your CSS file is correctly imported
import logo from "../images/Logo.jpeg"; // Logo image import
import { useState, useEffect } from "react";
import { useAuth } from "./Authcontext"; // Importing the custom useAuth hook

function Navbar({ searchTerm, onSearchChange }) {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname === '/movies' || location.pathname === '/';

    const { isLoggedIn, logout } = useAuth(); // Use context for authentication state

    return (
        <nav id="main-navbar">
            {/* Logo as a NavLink */}
            <NavLink to="/" className="logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </NavLink>

            {/* Navigation Links */}
            <div className="nav-links">
                <NavLink
                    to="/"
                    className="nav-link"
                    activeClassName="active-link"
                >
                    Home
                </NavLink>

                {/* Conditionally render Login and Signup links */}
                {!isLoggedIn ? (
                    <>
                        <NavLink
                            to="/login"
                            className="nav-link"
                            activeClassName="active-link"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="nav-link"
                            activeClassName="active-link"
                        >
                            Signup
                        </NavLink>
                    </>
                ) : (
                    <>
                        {/* Conditionally render Profile and Logout links */}
                        <NavLink
                            to="/profile"
                            className="nav-link"
                            activeClassName="active-link"
                        >
                            Profile
                        </NavLink>

                        <NavLink
                            to="/"
                            className="nav-link"
                            onClick={logout} // Calls logout when clicked
                        >
                            Logout
                        </NavLink>
                    </>
                )}

                <NavLink
                    to="/movielist"
                    className="nav-link"
                    activeClassName="active-link"
                >
                    MovieList
                </NavLink>
                <NavLink
                    to="/watchlist"
                    className="nav-link"
                    activeClassName="active-link"
                >
                    Watchlist
                </NavLink>
                <NavLink
                    to="/favorites"
                    className="nav-link"
                    activeClassName="active-link"
                >
                    Favorites
                </NavLink>
                <NavLink
                    to="/watched"
                    className="nav-link"
                    activeClassName="active-link"
                >
                    Watched
                </NavLink>
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
