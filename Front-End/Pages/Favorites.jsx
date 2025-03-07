import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/movielist.css";

const Favorites = ({ token }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return;
        }

        // Fetch the favorite movies for the logged-in user
        axios
            .get("http://localhost:5002/api/movies/favorites", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setFavoriteMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching favorite movies:", error);
            });
    }, [token]);

    return (
        <div className="movie-list-page">
            <h1>Your Favorites</h1>
            <div className="movie-list">
                {favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <div key={movie._id} className="movie-card">
                            <img src={movie.poster} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                                <p>{movie.language}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies in your favorites</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
