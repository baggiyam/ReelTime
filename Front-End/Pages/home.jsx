import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:5002/api/movies");
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Welcome to the Movie App</h2>
            <h3>Movies List</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
