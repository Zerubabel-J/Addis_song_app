const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema); //creates a model that allows to perform CRUD  operations
// console.log("Song model created", songSchema);
module.exports = Song;
