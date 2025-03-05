// backend/Models/Movie.js

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    imdbRating: {
      type: Number,
      required: true,
    },
    googleRating: {
      type: Number,
      required: true,
    },
    userAdded: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    suggestedToAll: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
