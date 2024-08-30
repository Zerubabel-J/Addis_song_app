// src/types/song.ts
export interface Song {
  _id: string; // Use _id as it appears in the API response
  title: string;
  artist: string;
  album?: string;
  genre: string;
}

export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other environment variables here if needed
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
