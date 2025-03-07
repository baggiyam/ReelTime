import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing pages
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AddMovie from '../pages/AddMovies';
import MovieList from '../pages/Movielist';
import Favorites from '../pages/Favorites';
import Watchlist from '../pages/Watchlist';
import Watched from '../pages/Watched'; // Import Watched Page
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

const App = () => {
  // Store the token in state (could come from localStorage or a context if you're using one)
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage (if stored)
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Reset state
  };

  return (
    <Router>
      <Navbar searchTerm="" onSearchChange={() => { }} /> {/* Pass actual search props if necessary */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movielist" element={<MovieList token={token} />} />
        <Route path="/watchlist" element={<Watchlist token={token} />} />
        <Route path="/favorites" element={<Favorites token={token} />} />
        <Route path="/watched" element={<Watched token={token} />} />
        <Route path="/addmovie" element={<AddMovie />} /> {/* Assuming AddMovie page exists */}
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
