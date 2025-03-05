const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const handleError=require("../utils/errorHandler.js")
const router = express.Router();

// 🔑 OpenAI API Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 🎬 AI Movie Details Route
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Movie title is required!" });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Generate a JSON object with title, description, genre, releaseDate, language, imdbRating, googleRating for the movie: ${title}.`,
        },
      ],
    });

    const aiGeneratedMovie = JSON.parse(response.data.choices[0].message.content);
    res.json(aiGeneratedMovie);
  } catch (error) {
    console.error("AI request error:", error);
 handleError(res, error, message = "An error occurred", statusCode = 500)
  }
});

module.exports = router;
