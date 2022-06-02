import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { songsDetails } from "../../Components/types/types";

const initialState: Array<songsDetails> = [
  {
    album: {
      id: 9007781,
      title: "1989 (Deluxe)",
      cover: "https://api.deezer.com/album/9007781/image",
      cover_small:
        "https://e-cdns-images.dzcdn.net/images/cover/68b4e…6958b17f05b062ffa8d7ae114/56x56-000000-80-0-0.jpg",
      cover_medium:
        "https://e-cdns-images.dzcdn.net/images/cover/68b4e…58b17f05b062ffa8d7ae114/250x250-000000-80-0-0.jpg",
      cover_xl:
        "https://e-cdns-images.dzcdn.net/images/cover/68b4e986958b17f05b062ffa8d7ae114/1000x1000-000000-80-0-0.jpg",
      md5_image: "68b4e986958b17f05b062ffa8d7ae114",
      tracklist: "https://api.deezer.com/album/9007781/tracks",
      type: "album",
    },
    artist: {
      id: 12246,
      name: "Taylor Swift",
      link: "https://www.deezer.com/artist/12246",
      picture: "https://api.deezer.com/artist/12246/image",
      picture_small:
        "https://e-cdns-images.dzcdn.net/images/artist/24eb…736e1295a548e683b584caa6a/56x56-000000-80-0-0.jpg",
      picture_big:
        "https://e-cdns-images.dzcdn.net/images/artist/24eb277736e1295a548e683b584caa6a/500x500-000000-80-0-0.jpg",
      picture_medium:
        "https://e-cdns-images.dzcdn.net/images/artist/24eb277736e1295a548e683b584caa6a/250x250-000000-80-0-0.jpg",
      picture_xl:
        "https://e-cdns-images.dzcdn.net/images/artist/24eb277736e1295a548e683b584caa6a/1000x1000-000000-80-0-0.jpg",
      tracklist: "https://api.deezer.com/artist/12246/top?limit=50",
      type: "artist",
    },
    duration: 231,
    explicit_content_cover: 0,
    explicit_content_lyrics: 0,
    explicit_lyrics: false,
    id: 89077547,
    link: "https://www.deezer.com/track/89077547",
    md5_image: "68b4e986958b17f05b062ffa8d7ae114",
    preview:
      "https://cdns-preview-6.dzcdn.net/stream/c-6e5160a0eb0a1e062f294a21148fd2fc-8.mp3",
    rank: 870988,
    readable: true,
    title: "Blank Space",
    title_short: "Blank Space",
    title_version: "",
    type: "track",
  },
];

export const likedSlice = createSlice({
  name: "likedList",
  initialState,
  reducers: {
    addLikeSong: (state, action: PayloadAction<songsDetails>) => {
      return state.concat(action.payload);
    },
    deleteLikedSong: (state, action: PayloadAction<number>) => {
      return state.filter((song) => song.id !== action.payload);
    },
  },
});

export const { addLikeSong, deleteLikedSong } = likedSlice.actions;

export default likedSlice.reducer;
