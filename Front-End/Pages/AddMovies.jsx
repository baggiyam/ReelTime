import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovies = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");
    const [imdbRating, setImdbRating] = useState("");
    const [googleRating, setGoogleRating] = useState("");
    const [userAdded, setUserAdded] = useState("");
    const [suggestedToAll, setSuggestedToAll] = useState("");
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    //  Fetch AI-generated movie details
    const fetchMovieDetails = async () => {
        if (!title.trim()) return; // Prevent empty requests
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/ai-movie-details", { title });
            const movieData = response.data;

            // ✅ Populate form fields with AI-generated data
            setDescription(movieData.description || "");
            setReleaseDate(movieData.releaseDate || "");
            setLanguage(movieData.language || "");
            setGenre(movieData.genre || "");
            setImdbRating(movieData.imdbRating || "");
            setGoogleRating(movieData.googleRating || "");
        } catch (error) {
            console.error("Error fetching AI-generated details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            title,
            description,
            releaseDate,
            language,
            genre,
            imdbRating,
            googleRating,
            userAdded,
            suggestedToAll
        };

        axios.post("http://localhost:5000/movies/", newMovie)
            .then((response) => {
                console.log("Movie added successfully:", response.data);
                navigate("/movies"); // Redirect after submission
            })
            .catch((error) => {
                console.error("Error posting new movie:", error);
            });
    };

    return (
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={fetchMovieDetails} />
                {loading && <p>Fetching movie details...</p>} {/* Show loading message */}
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" placeholder="Release Date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <input type="number" placeholder="IMDb Rating" value={imdbRating} onChange={(e) => setImdbRating(e.target.value)} />
                <input type="number" placeholder="Google Rating" value={googleRating} onChange={(e) => setGoogleRating(e.target.value)} />
                <input type="text" placeholder="User Added By" value={userAdded} onChange={(e) => setUserAdded(e.target.value)} />
                <input type="text" placeholder="Suggested To All?" value={suggestedToAll} onChange={(e) => setSuggestedToAll(e.target.value)} />
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovies;
