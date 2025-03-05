const mongoose = require('mongoose');
const User=require('./User')
const Movie=require('./Movies');
const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  ],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;

