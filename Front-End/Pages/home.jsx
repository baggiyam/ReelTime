import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Home.css";
import axios from 'axios';  // Corrected the typo

const Home = () => {
    const [movies, setMovies] = useState([]);  // Corrected state variable name to 'setMovies'
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Fetching movie data from API
        axios.get("http://localhost:5002/api/movies/")
            .then((response) => {
                const movieData = response.data;
                const sortedMovies = movieData.slice(-5).reverse();  // Fetching the last 5 movies
                setMovies(sortedMovies);
            })
            .catch((error) => {
                console.log("Error fetching movies: ", error);
            });
    }, []);

    useEffect(() => {
        // Set interval to switch between movies every 5 seconds
        if (movies.length > 0) {
            const interval = setInterval(() => {
                setIndex(prevIndex => (prevIndex + 1) % movies.length);  // Loop through the movies
            }, 5000);
            return () => clearInterval(interval);  // Clean up interval on unmount
        }
    }, [movies]);

    return (
        <div>
            <div
                className="hero-banner"
                style={{ backgroundImage: `url(${movies[index]?.poster})` }}>
                <div className="hero-content">
                    <h1>{movies[index]?.title || "Loading..."}</h1>
                    <p>{movies[index]?.description || "Discover the latest movies."}</p>
                    {movies.length > 0 && (
                        <a href={`/movies/${movies[index]._id}`} className="watch-now-btn">
                            View Details
                        </a>
                    )}
                </div>
            </div>

            {/* Movie List Section */}
            <section className="movie-list-section">
                <h2>Latest Movies</h2>
                <div className="movie-list">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div key={movie._id} className="movie-card">
                                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                                <div className="movie-card-info">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genre}</p>
                                    <p>{movie.language}</p>
                                    <Link to={`/movies/${movie._id}`} className="view-details-btn">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading movies...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
