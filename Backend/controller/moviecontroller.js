const Movie = require('../Models/Movies');  // Movie model
const User = require('../Models/User');    // User model

// Add movie to the Watchlist
const addToWatchlist = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);  // Fetch movie by ID
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const user = await User.findById(req.user._id);  // Fetch logged-in user
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if movie is already in the watchlist
    if (user.watchlist.includes(movie._id)) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    user.watchlist.push(movie._id);  // Add movie to user's watchlist
    await user.save();  // Save the user with the updated watchlist

    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add movie to the Favorites
const addToFavorites = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);  // Fetch movie by ID
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const user = await User.findById(req.user._id);  // Fetch logged-in user
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if movie is already in the favorites
    if (user.favorites.includes(movie._id)) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    user.favorites.push(movie._id);  // Add movie to user's favorites
    await user.save();  // Save the user with the updated favorites

    res.status(200).json({ message: 'Movie added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark movie as Watched
const addToWatched = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);  // Fetch movie by ID
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const user = await User.findById(req.user._id);  // Fetch logged-in user
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if movie is already in the watched list
    if (user.watched.includes(movie._id)) {
      return res.status(400).json({ message: 'Movie already in watched list' });
    }

    user.watched.push(movie._id);  // Add movie to user's watched list
    await user.save();  // Save the user with the updated watched list

    res.status(200).json({ message: 'Movie marked as watched' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's Watchlist
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchlist');  // Populate movie data
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.watchlist);  // Send the user's watchlist
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's Favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');  // Populate movie data
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.favorites);  // Send the user's favorites
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's Watched List
const getWatched = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watched');  // Populate movie data
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.watched);  // Send the user's watched list
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addToWatchlist,
  addToFavorites,
  addToWatched,
  getWatchlist,
  getFavorites,
  getWatched
};
