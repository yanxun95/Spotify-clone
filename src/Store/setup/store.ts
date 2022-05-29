import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../user/userSlice";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import playingSlice from "../playing/playingSlice";
import numOfSongSlice from "../playing/numOfSongSlice";
import likedSlice from "../liked/likedSlice";

let key: string;
if (process.env.REACT_APP_SECRET_KEY) {
  key = process.env.REACT_APP_SECRET_KEY;
} else {
  throw new Error("REACT_APP_SECRET_KEY is not set");
}

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: key,
      onError: (error) => {
        console.log(error);
      },
    }),
  ],
};

const bigReducer = combineReducers({
  user: userSlice,
  playlist: playingSlice,
  numOfSong: numOfSongSlice,
  likedSongs: likedSlice,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
