export interface Song {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  genre: string;
}

export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
