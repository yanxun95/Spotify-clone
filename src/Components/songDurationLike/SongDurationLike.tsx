import "./songDurationLike.scss";
import { FiHeart } from "react-icons/fi";
import { likeSong } from "./types";
import { useDispatch } from "react-redux";
import { addLikeSong, deleteLikedSong } from "../../Store/liked/likedSlice";
import { useAppSelector } from "../../Store/setup/hooks";
import { songsDetails } from "../types/types";

const SongDurationLike = (songDetails: likeSong) => {
  const dispatch = useDispatch();
  const likedSongs = useAppSelector((state) => state.likedSongs);
  const addSongToLike = () => {
    if (
      likedSongs.some(
        (song: songsDetails) => song.id === songDetails.songDetails.id
      )
    ) {
      alert("This song is already in your liked songs");
    } else {
      alert("Added to your liked songs");
      dispatch(addLikeSong(songDetails.songDetails));
    }
  };

  const deleteSong = (id: number) => {
    dispatch(deleteLikedSong(id));
  };
  return (
    <>
      {songDetails.title === "album" ? (
        <FiHeart className="song-duration-like" onClick={addSongToLike} />
      ) : (
        <FiHeart
          className="song-duration-liked"
          onClick={() => deleteSong(songDetails.songDetails.id)}
        />
      )}
    </>
  );
};

export default SongDurationLike;
