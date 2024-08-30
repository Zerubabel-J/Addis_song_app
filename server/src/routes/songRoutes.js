const express = require("express");
const router = express.Router();
const {
  createSong,
  getAllSongs,
  updateSongById,
  deleteSongById,
} = require("../controllers/songController");

// @route   POST /api/songs
// @desc    Create a new song
router.post("/songs", createSong);

// @route   GET /api/songs
// @desc    Get all songs
router.get("/songs", getAllSongs);

// @route   PUT /api/songs/:id
// @desc    Update a song by ID
router.put("/songs/:id", updateSongById);

// @route   DELETE /api/songs/:id
// @desc    Delete a song by ID
router.delete("/songs/:id", deleteSongById);

module.exports = router;
