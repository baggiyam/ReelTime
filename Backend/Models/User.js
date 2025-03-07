const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
}],
favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
}],
watchedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
role:{
  type:String,
  enum:['admin','user'],
  default:'user',
}

}

);

const User = mongoose.model('User', userSchema);

module.exports = User;
