
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/movielist.css";

const MovieList = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
 
    axios
      .get("http://localhost:5002/api/movies/")
      .then((response) => {
        console.log("Movies loaded:", response.data); 
        setMovies(response.data);  
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleAddToWatchlist = (movieId) => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      axios
        .post(
          `http://localhost:5002/api/movies/add-to-watchlist/${movieId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error adding movie to watchlist:", error);
        });
    }
  };

  const handleAddToFavorites = (movieId) => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      axios
        .post(
          `http://localhost:5002/api/movies/add-to-favorites/${movieId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error adding movie to favorites:", error);
        });
    }
  };

  const handleMarkAsWatched = (movieId) => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      axios
        .post(
          `http://localhost:5002/api/movies/mark-as-watched/${movieId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error marking movie as watched:", error);
        });
    }
  };

  return (
    <div className="movie-list-page">
      <h1>All Movies</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
                <p>{movie.language}</p>
                <div className="movie-actions">
                  <button onClick={() => handleAddToWatchlist(movie._id)}>
                    Add to Watchlist
                  </button>
                  <button onClick={() => handleAddToFavorites(movie._id)}>
                    Add to Favorites
                  </button>
                  <button onClick={() => handleMarkAsWatched(movie._id)}>
                    Mark as Watched
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <h2>Please log in to continue</h2>
            <button onClick={() => navigate("/login")}>Go to Login Page</button>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
