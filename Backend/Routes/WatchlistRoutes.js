const express = require('express');
const router = express.Router();
const Watchlist = require('../Models/WatchlistModel');
const Movie = require("../Models/Movies");
const User = require('../Models/User');
const { protect } = require('../middleware/authMiddleware');

// Add a movie to the watchlist
router.post('/add', protect, async (req, res) => {
  const { movieId } = req.body;

  try {
    const userWatchlist = await Watchlist.findOne({ userId: req.user._id });

    if (!userWatchlist) {
      const newWatchlist = new Watchlist({
        userId: req.user._id,
        movies: [movieId],
      });
      await newWatchlist.save();
      return res.status(201).json({ message: 'Movie added to watchlist!' });
    }

    // If the movie is already in the watchlist
    if (userWatchlist.movies.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in watchlist!' });
    }

    userWatchlist.movies.push(movieId);
    await userWatchlist.save();
    res.status(200).json({ message: 'Movie added to watchlist!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

// Remove a movie from the watchlist
router.delete('/remove', protect, async (req, res) => {
  const { movieId } = req.body;

  try {
    const userWatchlist = await Watchlist.findOne({ userId: req.user._id });

    if (!userWatchlist || !userWatchlist.movies.includes(movieId)) {
      return res.status(404).json({ message: 'Movie not found in watchlist!' });
    }

    userWatchlist.movies = userWatchlist.movies.filter(id => id.toString() !== movieId);
    await userWatchlist.save();
    res.status(200).json({ message: 'Movie removed from watchlist!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

module.exports = router;
