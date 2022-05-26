import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const numOfSongSlice = createSlice({
  name: "numberOfSong",
  initialState,
  reducers: {
    setNumOfSong: (state, action: PayloadAction<number>) => {
      return (state = action.payload);
    },
  },
});

export const { setNumOfSong } = numOfSongSlice.actions;

export default numOfSongSlice.reducer;
