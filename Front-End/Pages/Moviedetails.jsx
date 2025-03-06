// src/pages/Moviedetails.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../src/utils/axios'

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      {movies.map((movie) => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p>IMDB Rating: {movie.imdbRating}</p>
          <p>Google Rating: {movie.googleRating}</p>
          <img src={movie.posterImage} alt={movie.title} width="200" />
          <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
            Watch Trailer
          </a>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
