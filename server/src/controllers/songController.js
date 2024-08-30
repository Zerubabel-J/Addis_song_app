const Song = require("../models/song");

const createSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;

  if (!title || !artist || !album || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newSong = new Song({ title, artist, album, genre });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    console.error("Error creating song:", error);
    res
      .status(500)
      .json({ message: "Error creating song", error: error.message });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res
      .status(500)
      .json({ message: "Error fetching songs", error: error.message });
  }
};

const updateSongById = async (req, res) => {
  const { title, artist, album, genre } = req.body;

  if (!title || !artist || !album || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, genre },
      { new: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(updatedSong);
  } catch (error) {
    console.error("Error updating song:", error);
    res
      .status(500)
      .json({ message: "Error updating song", error: error.message });
  }
};

const deleteSongById = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res
      .status(500)
      .json({ message: "Error deleting song", error: error.message });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  updateSongById,
  deleteSongById,
};
