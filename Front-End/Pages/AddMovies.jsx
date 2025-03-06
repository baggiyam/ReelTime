// src/pages/AddMovies.js

import React, { useState } from 'react';
import axiosInstance from '../src/utils/axios'

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [language, setLanguage] = useState('');
    const [genre, setGenre] = useState('');
    const [imdbRating, setImdbRating] = useState('');
    const [googleRating, setGoogleRating] = useState('');
    const [posterImage, setPosterImage] = useState('');
    const [trailerLink, setTrailerLink] = useState('');

    const handleAddMovie = async (e) => {
        e.preventDefault();

        const movieData = {
            title,
            description,
            releaseDate,
            language,
            genre,
            imdbRating,
            googleRating,
            posterImage,
            trailerLink,
        };

        try {
            await axiosInstance.post('/movies', movieData);
            alert('Movie added successfully!');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div>
            <h1>Add Movie</h1>
            <form onSubmit={handleAddMovie}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Release Date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="IMDB Rating"
                    value={imdbRating}
                    onChange={(e) => setImdbRating(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Google Rating"
                    value={googleRating}
                    onChange={(e) => setGoogleRating(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Poster Image URL"
                    value={posterImage}
                    onChange={(e) => setPosterImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Trailer Link"
                    value={trailerLink}
                    onChange={(e) => setTrailerLink(e.target.value)}
                />
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
