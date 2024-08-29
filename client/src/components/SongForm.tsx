import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { addSong } from "../features/song/songSlice";
import { Song } from "../types/song"; // Import the updated Song interface

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  album: z.string().optional(),
  genre: z.string().min(1, { message: "Genre is required" }),
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.borders.radius};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borders.radius};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`;

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}
      <Input {...register("artist")} placeholder="Artist" />
      {errors.artist && <p>{errors.artist.message}</p>}
      <Input {...register("album")} placeholder="Album" />
      <Input {...register("genre")} placeholder="Genre" />
      {errors.genre && <p>{errors.genre.message}</p>}
      <Button type="submit">Add Song</Button>
    </Form>
  );
};

export default SongForm;
