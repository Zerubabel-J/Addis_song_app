import { combineReducers } from "@reduxjs/toolkit";
import songReducer from "./song/songSlice";

const rootReducer = combineReducers({
  songs: songReducer,
});

export default rootReducer;
