import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { albumMoreDeatils, songsDetails } from "../../Components/types/types";

const initialState: Array<albumMoreDeatils> = [
  {
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
    available: true,
    contributors: [],
    cover: "",
    cover_big: "",
    cover_medium: "",
    cover_small: "",
    cover_xl: "",
    duration: 0,
    explicit_content_cover: 0,
    explicit_content_lyrics: 0,
    explicit_lyrics: true,
    fans: 0,
    genre_id: 0,
    genres: {
      data: [],
    },
    id: 0,
    label: "",
    link: "",
    md5_image: "",
    nb_tracks: 0,
    record_type: "",
    release_date: "",
    share: "",
    title: "",
    tracklist: "",
    tracks: {
      data: [
        {
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
      ],
    },
    type: "",
    upc: "",
  },
];

export const likedSlice = createSlice({
  name: "likedList",
  initialState,
  reducers: {
    addLikeSong: (state, action: PayloadAction<Array<albumMoreDeatils>>) => {
      console.log(action.payload);
      // return (state = action.payload);
    },
  },
});

export const { addLikeSong } = likedSlice.actions;

export default likedSlice.reducer;
