import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // ✅ Import axios
import "../Styles/Home.css";

const Home = () => {
    const [movies, setMovies] = useState([]);  // ✅ Corrected setMovies
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5002/api/movies/")
            .then((response) => {
                const movieData = response.data;
                const sortedMovies = movieData.slice(-5).reverse();  // ✅ Fixed variable name
                setMovies(sortedMovies);
            })
            .catch((error) => {
                console.log("Error fetching movies:", error);
            });
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const interval = setInterval(() => {
                setIndex(prevIndex => (prevIndex + 1) % movies.length);
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [movies]);

    return (
        <div className="hero-banner" style={{ backgroundImage: `url(${movies[index]?.poster})` }}>
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
    );
};

export default Home;
