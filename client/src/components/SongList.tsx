// src/components/SongList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsRequest, deleteSong } from "../features/song/songSlice";
import { RootState } from "../store/store";
import { Song } from "../types/song";

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
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
                  if (song._id) {
                    handleDelete(song._id);
                  } else {
                    console.error("Song ID is missing");
                  }
                }}
              >
                Delete
              </button>
              {/* Implement the edit button later */}
              <button>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSongsRequest, deleteSong } from "../features/song/songSlice";
// import { RootState } from "../store/store";
// import { Song } from "../types/song";

// const SongList = () => {
//   const dispatch = useDispatch();
//   const songs = useSelector((state: RootState) => state.songs.songs);
//   const loading = useSelector((state: RootState) => state.songs.loading);
//   const error = useSelector((state: RootState) => state.songs.error);

//   useEffect(() => {
//     dispatch(fetchSongsRequest());
//   }, [dispatch]);

//   const handleDelete = (id: string) => {
//     dispatch(deleteSong(id));
//     console.log("Song deleted", id);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Song List</h2>
//       {songs.length === 0 ? (
//         <p>No songs available.</p>
//       ) : (
//         <ul>
//           {songs.map((song: Song) => (
//             <li key={song.id}>
//               <strong>{song.title}</strong> by {song.artist} ({song.genre})
//               <button
//                 onClick={() => {
//                   song.id
//                     ? handleDelete(song.id)
//                     : console.error("Song ID is missing");
//                 }}
//               >
//                 Delete
//               </button>
//               {/* Implement the edit button later */}
//               <button>Edit</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SongList;
