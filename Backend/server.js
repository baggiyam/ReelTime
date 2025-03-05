const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require('./Routes/authroutes'); 
const User = require('./Models/User'); 
const Movies=require('./Models/Movies')
const movieRoutes = require('./Routes/MovieRoutes');
const watchlistRoutes=require('./Routes/WatchlistRoutes');
const favoritesRoutes=require('./Routes/FavoritesRoutes')
const aiGeneratedMovie=require('./Routes/AiMovieRoutes')
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

 // 🔑 OpenAI API Setup
  const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
// Use the auth routes for handling signup and login
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use("/api/ai-movie-details",aiGeneratedMovie );

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the Movie App!");
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
