import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
} from "./songSlice";
import {
  fetchSongs,
  createSong,
  editSong,
  removeSong,
} from "../../api/songApi";

function* handleFetchSongs() {
  try {
    const songs = yield call(fetchSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* handleAddSong(action: ReturnType<typeof addSong>) {
  try {
    yield call(createSong, action.payload);
    yield put(fetchSongsRequest());
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// function* handleUpdateSong(action: ReturnType<typeof updateSong>) {
//   try {
//     yield call(editSong, action.payload);
//     yield put(fetchSongsRequest());
//   } catch (error: any) {
//     yield put(fetchSongsFailure(error.message));
//   }
// }

function* handleUpdateSong(action: ReturnType<typeof updateSong>) {
  try {
    yield call(editSong, action.payload);
    yield put(updateSong(action.payload)); // Update the song in the state directly
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* handleDeleteSong(action: ReturnType<typeof deleteSong>) {
  try {
    yield call(removeSong, action.payload);
    yield put(fetchSongsRequest()); // Refresh the list
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchSongActions() {
  yield takeLatest(fetchSongsRequest.type, handleFetchSongs);
  yield takeLatest(addSong.type, handleAddSong);
  yield takeLatest(updateSong.type, handleUpdateSong);
  yield takeLatest(deleteSong.type, handleDeleteSong);
}
