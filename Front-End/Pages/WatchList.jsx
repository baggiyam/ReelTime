// src/pages/Watchlist.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../src/utils/axios'

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await axiosInstance.get('/watchlist');
                setWatchlist(response.data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            }
        };

        fetchWatchlist();
    }, []);

    return (
        <div>
            <h1>Watchlist</h1>
            {watchlist.map((movie) => (
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

export default Watchlist;
