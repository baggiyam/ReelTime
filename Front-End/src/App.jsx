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
import Navbar from '../Components/navbar';
import LoginPage from '../pages/login';
import Footer from '../Components/Footer';

const App = () => {
  return (
    <Router>

      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </Router>


  );
};

export default App;