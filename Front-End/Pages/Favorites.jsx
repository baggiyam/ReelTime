// FavoritesPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Favorites.css";

const FavoritesPage = ({ token }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5002/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setFavorites(response.data))
      .catch(() => console.log("Failed to load favorites."));
  }, [token]);

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
