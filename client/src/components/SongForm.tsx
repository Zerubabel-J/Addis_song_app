import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { addSong } from "../features/song/songSlice";
import { Song } from "../types/song"; // Import the updated Song interface

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  album: z.string().optional(),
  genre: z.string().min(1, { message: "Genre is required" }),
});

const SongForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Song>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: Song) => {
    dispatch(addSong(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}
      <input {...register("artist")} placeholder="Artist" />
      {errors.artist && <p>{errors.artist.message}</p>}
      <input {...register("album")} placeholder="Album" />
      <input {...register("genre")} placeholder="Genre" />
      {errors.genre && <p>{errors.genre.message}</p>}
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongForm;
