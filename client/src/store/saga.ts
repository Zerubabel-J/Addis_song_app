import { all, fork } from "redux-saga/effects";
import { watchSongActions } from "../features/song/songSaga";

export default function* rootSaga() {
  yield all([fork(watchSongActions)]);
}
