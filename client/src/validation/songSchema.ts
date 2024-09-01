import { z } from "zod";

export const songSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  album: z.string().optional(),
  genre: z.string().min(1, "Genre is required"),
});
