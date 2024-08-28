import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Song } from "../types/song";

// Validation schema
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  album: z.string().optional(),
  genre: z.string().min(1, { message: "Genre is required" }),
});

interface EditFormProps {
  song: Song;
  onUpdate: (song: Song) => void;
}

const EditForm: React.FunctionComponent<EditFormProps> = ({
  song,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: song,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Omit<Song, "id">) => {
    onUpdate({ ...data, _id: song._id });
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
      <button type="submit">Update Song</button>
    </form>
  );
};

export default EditForm;
