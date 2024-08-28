const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// Get statistics
router.get("/statistics", async (req, res) => {
  try {
    // Total number of songs
    const totalSongs = await Song.countDocuments();

    // Total number of artists
    const totalArtists = await Song.distinct("artist").countDocuments();

    // Total number of albums
    const totalAlbums = await Song.distinct("album").countDocuments();

    // Total number of genres
    const totalGenres = await Song.distinct("genre").countDocuments();

    // Number of songs per genre
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    // Number of songs and albums per artist
    const songsAndAlbumsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          songCount: 1,
          albumCount: { $size: "$albums" },
        },
      },
    ]);

    // Number of songs per album
    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      songsAndAlbumsPerArtist,
      songsPerAlbum,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res
      .status(500)
      .json({ message: "Error fetching statistics", error: error.message });
  }
});

module.exports = router;
