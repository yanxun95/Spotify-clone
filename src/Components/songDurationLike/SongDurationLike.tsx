import "./songDurationLike.scss";
import { FiHeart } from "react-icons/fi";
import { likeSong } from "./types";

const SongDurationLike = (songDetails: likeSong) => {
  const addSongToLike = () => {
    console.log(songDetails);
  };
  return <FiHeart className="song-duration-like" onClick={addSongToLike} />;
};

export default SongDurationLike;
