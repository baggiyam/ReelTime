// src/pages/Favorites.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../src/utils/axios'

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <h1>Favorites</h1>
            {favorites.map((movie) => (
                <div key={movie._id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <img src={movie.posterImage} alt={movie.title} width="200" />
                    <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                        Watch Trailer
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
