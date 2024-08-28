import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define your Zod schema
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  album: z.string().min(1, "Album is required"),
  genre: z.string().min(1, "Genre is required"),
});

type FormData = z.infer<typeof schema>;

function SongForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input id="title" {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      <label htmlFor="artist">Artist</label>
      <input id="artist" {...register("artist")} placeholder="Artist" />
      {errors.artist && <p>{errors.artist.message}</p>}

      <label htmlFor="album">Album</label>
      <input id="album" {...register("album")} placeholder="Album" />
      {errors.album && <p>{errors.album.message}</p>}

      <label htmlFor="genre">Genre</label>
      <input id="genre" {...register("genre")} placeholder="Genre" />
      {errors.genre && <p>{errors.genre.message}</p>}

      <button type="submit">Add Song</button>
    </form>
  );
}

export default SongForm;
