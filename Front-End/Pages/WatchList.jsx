import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/movielist.css"; // You can reuse this CSS for styling

const Watchlist = ({ token }) => {
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return;
        }

        // Fetch the watchlist for the logged-in user
        axios
            .get("http://localhost:5002/api/movies/watchlist", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setWatchlistMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching watchlist movies:", error);
            });
    }, [token]);

    return (
        <div className="movie-list-page">
            <h1>Your Watchlist</h1>
            <div className="movie-list">
                {watchlistMovies.length > 0 ? (
                    watchlistMovies.map((movie) => (
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
                    <p>No movies in your watchlist</p>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
