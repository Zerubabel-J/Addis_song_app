import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { addSong } from "../features/song/songSlice";
import { Song } from "../types/song";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  album: z.string().optional(),
  genre: z.string().min(1, { message: "Genre is required" }),
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  margin-left: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};

  @media (min-width: 768px) {
    flex: 1;
    &:nth-of-type(1) {
      margin-right: ${({ theme }) => theme.spacing.large};
    }
  }
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
  align-self: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`;

const SongForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Song>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Song> = (data) => {
    dispatch(addSong(data));
    reset(); // Clear input fields after submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormColumn>
        <Input {...register("title")} placeholder="Title" />
        {errors.title && <p>{errors.title.message}</p>}
        <Input {...register("artist")} placeholder="Artist" />
        {errors.artist && <p>{errors.artist.message}</p>}
      </FormColumn>
      <FormColumn>
        <Input {...register("album")} placeholder="Album" />
        <Input {...register("genre")} placeholder="Genre" />
        {errors.genre && <p>{errors.genre.message}</p>}
      </FormColumn>
      <Button type="submit">Add Song</Button>
    </Form>
  );
};

export default SongForm;
