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
import styled from "@emotion/styled";

// Register necessary chart components
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Summary = styled.div`
  flex: 1 1 50%;
  margin-top: 75px;
  max-width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    font-size: 24px;
    color: #333;
  }

  p {
    font-size: 21px;
    margin: 8px 0;
    color: #555;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const PieChartWrapper = styled.div`
  flex: 1 1 50%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 16px;
    font-size: 22px;
    color: #333;
  }

  canvas {
    width: 100% !important;
    height: auto !important;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChartWrapper = styled.div`
  flex: 1 1 calc(50% - 24px);
  max-width: 600px;
  min-width: 300px;

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

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
    <Container>
      <SummaryContainer>
        <Summary>
          <h2>Statistics</h2>
          <p>Total Songs: {totalSongs}</p>
          <p>Total Artists: {totalArtists}</p>
          <p>Total Albums: {totalAlbums}</p>
          <p>Total Genres: {totalGenres}</p>
        </Summary>
        <PieChartWrapper>
          <h3>Songs per Genre</h3>
          <Pie data={songsPerGenreData} />
        </PieChartWrapper>
      </SummaryContainer>
      <ChartsContainer>
        <ChartWrapper>
          <h3>Songs per Album</h3>
          <Bar data={songsPerAlbumData} />
        </ChartWrapper>
        <ChartWrapper>
          <h3>Songs and Albums per Artist</h3>
          <Bar data={artistData} />
        </ChartWrapper>
      </ChartsContainer>
    </Container>
  );
};

export default Statistics;
