const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// @route   POST /api/songs
// @desc    Create a new song
router.post("/songs", async (req, res) => {
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
});

// @route   GET /api/songs
// @desc    Get all songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res
      .status(500)
      .json({ message: "Error fetching songs", error: error.message });
  }
});

// @route   PUT /api/songs/:id
// @desc    Update a song by ID
router.put("/songs/:id", async (req, res) => {
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
});

// @route   DELETE /api/songs/:id
// @desc    Delete a song by ID
router.delete("/songs/:id", async (req, res) => {
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
});

module.exports = router;
