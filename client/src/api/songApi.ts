import axios from "axios";
import { Song } from "../types/song";

const API_URL = "http://localhost:5000/api/songs";

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSong = async (song: Song) => {
  await axios.post(API_URL, song);
};

export const editSong = async (song: Song) => {
  await axios.put(`${API_URL}/${song._id}`, song);
};

export const removeSong = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
