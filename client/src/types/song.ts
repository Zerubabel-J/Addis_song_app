export interface Song {
  id?: string; // 'id' is now optional
  title: string;
  artist: string;
  album?: string;
  genre: string;
}
