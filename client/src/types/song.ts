// src/types/song.ts
export interface Song {
  _id: string; // Use _id as it appears in the API response
  title: string;
  artist: string;
  album?: string;
  genre: string;
}
