const express = require("express");
const router = express.Router();
const Movie = require("../Models/Movies");
const User = require("../Models/User"); // Import the User model
const { protect } = require("../middleware/authMiddleware");
const handleError = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    handleError(res, error, "Error fetching all movies");
  }
});
router.get("/:id", async (req, res) => {
  try {
    // Extract movie ID from URL parameters
    const { id } = req.params;

    // Find the movie by its ID in the database
    const movie = await Movie.findById(id);

    // If movie is not found, return an error response
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // If movie is found, return the movie details
    res.status(200).json(movie);
  } catch (error) {
    handleError(res, error, "Error fetching movie details");
  }
});

// Add movie to the watchlist
router.post("/add-to-watchlist/:movieId", protect, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if movie is already in watchlist
    if (user.watchlist.includes(movieId)) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    // Add the movie to the user's watchlist
    user.watchlist.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie added to watchlist" });
  } catch (error) {
    handleError(res, error, "Error adding movie to watchlist");
  }
});

// Add movie to the favorites
router.post("/add-to-favorites/:movieId", protect, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if movie is already in favorites
    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    // Add the movie to the user's favorites
    user.favorites.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    handleError(res, error, "Error adding movie to favorites");
  }
});

// Add movie to watched
router.post("/add-to-watched/:movieId", protect, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if movie is already in watched
    if (user.watched.includes(movieId)) {
      return res.status(400).json({ message: "Movie already marked as watched" });
    }

    // Add the movie to the user's watched list
    user.watched.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie marked as watched" });
  } catch (error) {
    handleError(res, error, "Error adding movie to watched list");
  }
});

// Get all movies in the watchlist of the logged-in user
router.get("/watchlist", protect, async (req, res) => {
  try {
    const user = req.user;
    await user.populate("watchlist");
    res.status(200).json(user.watchlist);
  } catch (error) {
    handleError(res, error, "Error fetching watchlist");
  }
});

// Get all movies in the favorites list of the logged-in user
router.get("/favorites", protect, async (req, res) => {
  try {
    const user = req.user;
    await user.populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    handleError(res, error, "Error fetching favorites");
  }
});

// Get all movies in the watched list of the logged-in user
router.get("/watched", protect, async (req, res) => {
  try {
    const user = req.user;
    await user.populate("watched");
    res.status(200).json(user.watched);
  } catch (error) {
    handleError(res, error, "Error fetching watched movies");
  }
});

module.exports = router;
