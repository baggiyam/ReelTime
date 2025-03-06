import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing pages based on your naming convention
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AddMovie from '../pages/AddMovies';
import MovieList from '../pages/Moviedetails';
import Favorites from '../pages/Favorites';
import Watchlist from '../pages/Watchlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/movie-list" element={<MovieList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
