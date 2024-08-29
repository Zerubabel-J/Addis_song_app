// src/components/Statistics.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary chart components
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

const Statistics = () => {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/statistics"
        );
        setStatistics(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>Error loading statistics: {error}</p>;

  const {
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsPerGenre,
    songsAndAlbumsPerArtist,
    songsPerAlbum,
  } = statistics;

  // Prepare data for the charts
  const songsPerGenreData = {
    labels: songsPerGenre.map((genre: any) => genre._id),
    datasets: [
      {
        label: "Songs per Genre",
        data: songsPerGenre.map((genre: any) => genre.count),
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const songsPerAlbumData = {
    labels: songsPerAlbum.map((album: any) => album._id),
    datasets: [
      {
        label: "Songs per Album",
        data: songsPerAlbum.map((album: any) => album.count),
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 205, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const artistData = {
    labels: songsAndAlbumsPerArtist.map((artist: any) => artist._id),
    datasets: [
      {
        label: "Songs per Artist",
        data: songsAndAlbumsPerArtist.map((artist: any) => artist.songCount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Albums per Artist",
        data: songsAndAlbumsPerArtist.map((artist: any) => artist.albumCount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Songs: {totalSongs}</p>
      <p>Total Artists: {totalArtists}</p>
      <p>Total Albums: {totalAlbums}</p>
      <p>Total Genres: {totalGenres}</p>

      <div style={{ width: "50%", margin: "0 auto" }}>
        <h3>Songs per Genre</h3>
        <Pie data={songsPerGenreData} />

        <h3>Songs per Album</h3>
        <Bar data={songsPerAlbumData} />

        <h3>Songs and Albums per Artist</h3>
        <Bar data={artistData} />
      </div>
    </div>
  );
};

export default Statistics;
