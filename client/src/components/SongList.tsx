/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  deleteSong,
  updateSong,
} from "../features/song/songSlice";
import { RootState } from "../store/store";
import { Song } from "../types/song";
import EditForm from "./EditForm";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  color: #3498db;
  text-align: center;
  margin-bottom: 20px;
`;

const SongListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SongItem = styled.li`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f1f1f1;
  }
`;

const SongInfo = styled.div`
  font-size: 16px;
  strong {
    font-weight: 600;
    color: #2c3e50;
  }
`;

type ButtonProps = {
  variant?: "delete" | "edit";
};

const Button = styled.button<ButtonProps>`
  background-color: ${({ variant }) =>
    variant === "delete" ? "#e74c3c" : "#3498db"};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 8px;
  font-size: 14px;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "delete" ? "#c0392b" : "#2980b9"};
  }
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);

  const [editingSongId, setEditingSongId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (id) {
      dispatch(deleteSong(id));
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSongId(song._id);
  };

  const handleUpdate = (updatedSong: Song) => {
    dispatch(updateSong(updatedSong));
    setEditingSongId(null); // Close the edit form after update
  };

  return (
    <Container>
      <Heading>Song List</Heading>
      {loading ? (
        <p css={{ color: "#e74c3c", textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p css={{ color: "#e74c3c", textAlign: "center" }}>Error: {error}</p>
      ) : songs.length === 0 ? (
        <p css={{ textAlign: "center" }}>No songs available.</p>
      ) : (
        <SongListContainer>
          {songs.map((song: Song) => (
            <SongItem key={song._id}>
              {editingSongId === song._id ? (
                <EditForm song={song} onUpdate={handleUpdate} />
              ) : (
                <>
                  <SongInfo>
                    <strong>{song.title}</strong> by {song.artist} ({song.genre}
                    )
                  </SongInfo>
                  <div>
                    <Button
                      variant="delete"
                      onClick={() => handleDelete(song._id ?? "")}
                      aria-label={`Delete ${song.title}`}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="edit"
                      onClick={() => handleEdit(song)}
                      aria-label={`Edit ${song.title}`}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </SongItem>
          ))}
        </SongListContainer>
      )}
    </Container>
  );
};

export default SongList;
