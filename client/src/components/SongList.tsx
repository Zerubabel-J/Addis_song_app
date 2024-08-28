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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Song List</h2>
      {songs.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <ul>
          {songs.map((song: Song) => (
            <li key={song._id}>
              <strong>{song.title}</strong> by {song.artist} ({song.genre})
              <button
                onClick={() => {
                  song._id
                    ? handleDelete(song._id)
                    : console.error("Song ID is missing");
                }}
              >
                Delete
              </button>
              <button onClick={() => handleEdit(song)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {editingSong && <EditForm song={editingSong} onUpdate={handleUpdate} />}
    </div>
  );
};

export default SongList;
