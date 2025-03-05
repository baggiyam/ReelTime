// components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.posterUrl} alt={movie.title} />
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
      <p>Release Date: {movie.releaseDate}</p>
    </div>
  );
}

export default MovieDetail;
