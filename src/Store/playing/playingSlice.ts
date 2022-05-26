import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { songsDetails } from "../../Components/types/types";

const initialState: Array<songsDetails> = [
  {
    album: {
      cover: "",
      cover_big: "",
      cover_medium: "",
      cover_small: "",
      cover_xl: "",
      id: 0,
      md5_image: "",
      title: "",
      tracklist: "",
      type: "",
    },
    artist: {
      id: 0,
      link: "",
      name: "",
      nb_album: 0,
      nb_fan: 0,
      picture: "",
      picture_big: "",
      picture_medium: "",
      picture_small: "",
      picture_xl: "",
      radio: true,
      share: "",
      tracklist: "",
      type: "",
      role: "",
    },
    duration: 0,
    explicit_content_cover: 0,
    explicit_content_lyrics: 0,
    explicit_lyrics: true,
    id: 0,
    link: "",
    md5_image: "",
    preview: "",
    rank: 0,
    readable: true,
    title: "",
    title_short: "",
    title_version: "",
    type: "",
  },
];

export const playingSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Array<songsDetails>>) => {
      return (state = action.payload);
    },
  },
});

export const { setPlaylist } = playingSlice.actions;

export default playingSlice.reducer;
