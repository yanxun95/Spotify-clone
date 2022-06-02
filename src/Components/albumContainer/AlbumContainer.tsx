import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import BtnPlay from "../btnPlay/BtnPlay";
import BtnThreeDotMenu from "../btnThreeDotMenu/BtnThreeDotMenu";
import { props } from "./types";

const AlbumContainer = (album: props) => {
  const [albumTitle, setAlbumTitle] = useState<String>();

  const convertSecondToMinutesAlbum = (duration: number) => {
    let minutes = Math.floor(duration / 60);
    return `about ${minutes} min`;
  };

  const checkLengthOfTitle = () => {
    let title = album.album.title;
    if (title !== undefined) {
      if (title.length > 35) {
        let element = document.getElementById("albumTitle");
        element !== null && element.classList.add("xs-album-title-font");
      } else if (title.length > 21) {
        let element = document.getElementById("albumTitle");
        element !== null && element.classList.add("small-album-title-font");
      }
      setAlbumTitle(title.charAt(0).toUpperCase() + title.slice(1));
    }
  };

  useEffect(() => {
    album !== undefined && checkLengthOfTitle();
  }, []);

  // useEffect(() => {
  //   album !== undefined && checkLengthOfTitle();
  // }, [album]);
  return (
    <>
      <div className="album-first-container">
        <div className="album-image-container">
          <img
            id="albumImage"
            src={album.album.cover_medium}
            alt="album"
            className="album-image"
          />
        </div>
        <div className="album-details-container">
          <span className="album-type">
            {album.album.record_type.toUpperCase()}
          </span>
          <h1 id="albumTitle" className="album-title">
            {/* {checkLengthOfTitle(album.album.title)} */}
            {albumTitle}
          </h1>
          <div className="album-details">
            <img
              src={album.album.artist.picture_small}
              alt="album-artist"
              className="album-artist"
            />
            <span className="album-artist-name">{album.album.artist.name}</span>
            <span>
              {" "}
              &#8226; {album.album.release_date.slice(0, 4)} &#8226;{" "}
              {album.album.nb_tracks} songs,{" "}
            </span>
            <span className="album-duration">
              {convertSecondToMinutesAlbum(album.album.duration)}
            </span>
          </div>
        </div>
      </div>
      <div className="album-second-container">
        <BtnPlay />
        <FiHeart className="big-love-icon" />
        <BtnThreeDotMenu />
      </div>
    </>
  );
};

export default AlbumContainer;
