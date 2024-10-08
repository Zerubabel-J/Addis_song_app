import axios from "axios";
import { Song } from "../types/song";

const VITE_API_URL = (import.meta as any).env.VITE_API_URL;

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await axios.get(VITE_API_URL);
  return response.data;
};

export const createSong = async (song: Song) => {
  await axios.post(VITE_API_URL, song);
};

export const editSong = async (song: Song) => {
  await axios.put(`${VITE_API_URL}/${song._id}`, song);
};

export const removeSong = async (id: string) => {
  await axios.delete(`${VITE_API_URL}/${id}`);
};
