import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/movielist.css";

const Watched = ({ token }) => {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return;
        }

        // Fetch the watched movies for the logged-in user
        axios
            .get("http://localhost:5002/api/movies/watched", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setWatchedMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching watched movies:", error);
            });
    }, [token]);

    return (
        <div className="movie-list-page">
            <h1>Your Watched Movies</h1>
            <div className="movie-list">
                {watchedMovies.length > 0 ? (
                    watchedMovies.map((movie) => (
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
                    <p>No movies in your watched list</p>
                )}
            </div>
        </div>
    );
};

export default Watched;
