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

  const [token, setToken] = useState(null);

  // UseEffect to load token from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // Consistent key for token
    if (storedToken) {
      setToken(storedToken); // Set token in state
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token correctly from localStorage
    setToken(null); // Reset token state
  };

  return (
    <Router>
      {/* Pass token and handleLogout to Navbar */}
      <Navbar token={token} handleLogout={handleLogout} />

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
