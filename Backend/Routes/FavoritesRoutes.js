const express = require('express');
const router = express.Router();
const Favorites = require('../Models/Favorites');
const Movie = require("../Models/Movies");
const User = require('../Models/User');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// Add a movie to favorites
router.post('/add', protect, async (req, res) => {
  const { movieId } = req.body;

  // Validate movieId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID!' });
  }

  try {
    // Check if the movie exists
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found!' });
    }

    const userFavorites = await Favorites.findOne({ userId: req.user._id });

    if (!userFavorites) {
      const newFavorites = new Favorites({
        userId: req.user._id,
        movies: [movieId],
      });
      await newFavorites.save();
      return res.status(201).json({ message: 'Movie added to favorites!' });
    }

    // If the movie is already in the favorites
    if (userFavorites.movies.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in favorites!' });
    }

    userFavorites.movies.push(movieId);
    await userFavorites.save();
    res.status(200).json({ message: 'Movie added to favorites!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
});

// Remove a movie from favorites
router.delete('/remove', protect, async (req, res) => {
  const { movieId } = req.body;

  // Validate movieId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID!' });
  }

  try {
    const userFavorites = await Favorites.findOne({ userId: req.user._id });

    if (!userFavorites || !userFavorites.movies.includes(movieId)) {
      return res.status(404).json({ message: 'Movie not found in favorites!' });
    }

    userFavorites.movies = userFavorites.movies.filter(id => id.toString() !== movieId);
    await userFavorites.save();
    res.status(200).json({ message: 'Movie removed from favorites!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
});

module.exports = router;
