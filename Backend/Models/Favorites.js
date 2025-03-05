const mongoose = require('mongoose');
const user=require('./User');
const movie=require('./Movies')
const favoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  ],
});

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;