// src/pages/home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Movie App</h1>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/movie-list">View Movies</Link>
        </div>
    );
};

export default Home;
