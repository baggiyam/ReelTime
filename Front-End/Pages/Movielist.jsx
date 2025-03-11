// MovieListPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/MovieList.css";

const MovieListPage = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5002/api/movies")
      .then((response) => setMovies(response.data))
      .catch(() => setPopupMessage("Failed to load movies."));
  }, []);

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const handleAction = (movieId, endpoint, message) => {
    axios.post(`http://localhost:5002/api/movies/${endpoint}/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => showPopup(response.data.message || message))
      .catch(() => showPopup("Action failed. Try again."));
  };

  return (
    <div className="movie-list-page">
      <h1>Movies</h1>
      {popupVisible && <div className="popup">{popupMessage}</div>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <div className="movie-actions">
                  <button onClick={() => handleAction(movie._id, "add-to-watchlist", "Added to Watchlist!")}>Watchlist</button>
                  <button onClick={() => handleAction(movie._id, "add-to-favorites", "Added to Favorites!")}>Favorite</button>
                  <button onClick={() => handleAction(movie._id, "add-to-watched", "Marked as Watched!")}>Watched</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
