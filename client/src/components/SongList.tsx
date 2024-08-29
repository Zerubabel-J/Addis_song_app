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

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);

  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (id) {
      dispatch(deleteSong(id));
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
  };

  const handleUpdate = (updatedSong: Song) => {
    dispatch(updateSong(updatedSong));
    setEditingSong(null); // Close the edit form
  };

  return (
    <div
      css={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}
    >
      <h2 css={{ color: "#3498db" }}>Song List</h2>
      {loading ? (
        <p css={{ color: "#e74c3c" }}>Loading...</p>
      ) : error ? (
        <p css={{ color: "#e74c3c" }}>Error: {error}</p>
      ) : songs.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <ul css={{ listStyleType: "none", padding: 0 }}>
          {songs.map((song: Song) => (
            <li
              key={song._id}
              css={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{song.title}</strong> by {song.artist} ({song.genre})
              </div>
              <div>
                <button
                  onClick={() => handleDelete(song._id ?? "")}
                  css={{
                    marginRight: "8px",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  aria-label={`Delete ${song.title}`}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(song)}
                  css={{
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  aria-label={`Edit ${song.title}`}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingSong && <EditForm song={editingSong} onUpdate={handleUpdate} />}
    </div>
  );
};

export default SongList;
