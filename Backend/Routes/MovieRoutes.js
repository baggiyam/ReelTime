const express = require("express");
const router = express.Router();
const Movie = require("../Models/Movies");
const User = require('../Models/User');
const { protect } = require("../middleware/authMiddleware")
const handleError=require("../utils/errorHandler");
// Create a new movie (user must be authenticated)
router.post("/add", protect, async (req, res) => {
  const { title, description, releaseDate, language, genre, imdbRating, googleRating, suggestedToAll } = req.body;

  try {
    // Create a new movie, adding the user who created it
    const movie = new Movie({
      title,
      description,
      releaseDate,
      language,
      genre,
      imdbRating,
      googleRating,
      suggestedToAll,
      userAdded: req.user._id, // Set the user who added the movie from the token
    });

    await movie.save();
    res.status(201).json(movie); // Return the newly created movie
  } catch (error) {
    handleError(res, error, "Error creating movie");
  }
});

// Get all movies (no authentication needed)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    handleError(res, error, "Error fetching movies");
  }
});

// Get a single movie by ID (no authentication needed)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json(movie);
  } catch (error) {
   handleError(res,error,"Error fetching the movie!" );
  }
});

// Update a movie (user must be authenticated)
router.put("/:id", protect, async (req, res) => {
  const { title, description, releaseDate, language, genre, imdbRating, googleRating, suggestedToAll } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        handleError(res,error, "Movie not found!");
    }

    // Check if the logged-in user is the one who added the movie (optional validation)

    // Update the movie fields
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.language = language || movie.language;
    movie.genre = genre || movie.genre;
    movie.imdbRating = imdbRating || movie.imdbRating;
    movie.googleRating = googleRating || movie.googleRating;
    movie.suggestedToAll = suggestedToAll || movie.suggestedToAll;

    await movie.save();
    res.status(200).json(movie);
  } catch (error) {
    handleError(res,error,"Error updating movie!" );
  }
});

// Delete a movie (user must be authenticated)
router.delete("/:id", protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }

    // Check if the logged-in user is the one who added the movie (optional validation)
    if (movie.userAdded.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete movies that you added!" });
    }

    await movie.remove();
    res.status(200).json({ message: "Movie deleted successfully!" });
  } catch (error) {
    handleError(res,error, "Server error!");
  }
});

module.exports = router;
