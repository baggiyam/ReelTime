const express = require("express");
const router = express.Router();
const Movie = require("../Models/Movies");
const User = require('../Models/User');
const { protect } = require("../middleware/authMiddleware")
const handleError=require("../utils/errorHandler");
// Create a new movie (user must be authenticated)
router.post("/add", protect, async (req, res) => {
  const { title, description, releaseDate, language, genre, imdbRating, googleRating, poster,trailer,suggestedToAll } = req.body;

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
      poster,
      trailer,
      suggestedToAll,
      userAdded: req.user._id, 
    });

    await movie.save();
    res.status(201).json(movie); 
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

// ✅ Filter Movies (GET Request with Query Parameters)
router.get("/filter", async (req, res) => {
  const { genre, language, imdbRating, googleRating } = req.query;

  let filterConditions = {};

  // If 'genre' is provided in the query parameters, add it to the filter conditions
  if (genre) {
    filterConditions.genre = genre;
  }

  // If 'language' is provided, add it to the filter conditions
  if (language) {
    filterConditions.language = language;
  }

  // If 'imdbRating' is provided, filter movies with IMDb rating greater than or equal to the given value
  if (imdbRating) {
    filterConditions.imdbRating = { $gte: parseFloat(imdbRating) }; // Ensure imdbRating is a number
  }

  // If 'googleRating' is provided, filter movies with Google rating greater than or equal to the given value
  if (googleRating) {
    filterConditions.googleRating = { $gte: parseFloat(googleRating) }; // Ensure googleRating is a number
  }

  try {
    // Perform the query with the filter conditions
    const filteredMovies = await Movie.find(filterConditions);

    if (filteredMovies.length === 0) {
      return res.status(404).json({ message: "No movies found matching the filter criteria" });
    }

    // Return the filtered movies
    res.status(200).json(filteredMovies);
  } catch (error) {
    // Catch any error and send a 500 status code with the error message
    res.status(500).json({ message: "Error fetching the movie!", error: error.message });
  }
});

module.exports = router;
