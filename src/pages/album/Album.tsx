import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { props } from "./types";
import {
  albumMoreDeatils,
  smallSongDetails,
} from "../../Components/types/types";
import "./album.scss";
import { FiHeart } from "react-icons/fi";
import BtnPlay from "../../Components/btnPlay/BtnPlay";
import BtnThreeDotMenu from "../../Components/btnThreeDotMenu/BtnThreeDotMenu";
import SongDurationLike from "../../Components/songDurationLike/SongDurationLike";
import SongDurationMenu from "../../Components/songDurationMenu/SongDurationMenu";
import { convertSecondToMinutes } from "../../Components/function/Function";
import { BiTime } from "react-icons/bi";
import { setNumOfSong } from "../../Store/playing/numOfSongSlice";
import { setPlaylist } from "../../Store/playing/playingSlice";
import { useDispatch } from "react-redux";
import { songsDetails } from "../../Components/types/types";
import { useAppSelector } from "../../Store/setup/hooks";

const Album = (title: props) => {
  let albumId = useParams().id;
  const [album, setAlbum] = useState<albumMoreDeatils>();
  const [albumTitle, setAlbumTitle] = useState<String>();
  const [songList, setSongList] = useState<Array<songsDetails>>([]);
  const likedSongs = useAppSelector((state) => state.likedSongs);
  const [addLikeSong, setAddLikeSong] = useState<songsDetails>();
  const [currentType, setCurrentType] = useState<string>("");
  const dispatch = useDispatch();

  let key: string;
  if (process.env.REACT_APP_RAPIDAPI_KEY) {
    key = process.env.REACT_APP_RAPIDAPI_KEY;
  } else {
    throw new Error("REACT_APP_RAPIDAPI_KEY is not set");
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": key,
    },
  };

  const getAlbumDetails = async () => {
    //if the title is album the run fetch
    //if the title is liked, set album to liked redux
    if (title.title === "album") {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`,
          options
        );
        if (response.ok) {
          let result = await response.json();
          setCurrentType("album");
          setAlbum(result);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (title.title === "liked") {
      console.log("liked");
      setAlbum(likedSongs);
    }
  };

  const convertSecondToMinutesAlbum = (duration: number) => {
    let minutes = Math.floor(duration / 60);
    return `about ${minutes} min`;
  };

  const checkLengthOfTitle = () => {
    let title = album?.title;
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

  const setTypesForNowPlaying = () => {
    let newArr = [];
    if (album !== undefined && currentType === "album") {
      for (let i = 0; i < album.tracks.data.length; i++) {
        let newObj = {
          album: {
            cover: album.cover,
            cover_big: album.cover_big,
            cover_medium: album.cover_medium,
            cover_small: album.cover_small,
            cover_xl: album.cover_xl,
            id: album.id,
            md5_image: album.md5_image,
            title: album.title,
            tracklist: album.tracklist,
            type: album.type,
          },
          artist: {
            id: album.artist.id,
            name: album.artist.name,
            picture: album.artist.picture,
            picture_big: album.artist.picture_big,
            picture_medium: album.artist.picture_medium,
            picture_small: album.artist.picture_small,
            picture_xl: album.artist.picture_xl,
            tracklist: album.artist.tracklist,
            type: album.artist.type,
          },
          duration: album.tracks.data[i].duration,
          explicit_content_cover: album.tracks.data[i].explicit_content_cover,
          explicit_content_lyrics: album.tracks.data[i].explicit_content_lyrics,
          explicit_lyrics: album.tracks.data[i].explicit_lyrics,
          id: album.tracks.data[i].id,
          link: album.tracks.data[i].link,
          md5_image: album.tracks.data[i].md5_image,
          preview: album.tracks.data[i].preview,
          rank: album.tracks.data[i].rank,
          readable: album.tracks.data[i].readable,
          title: album.tracks.data[i].title,
          title_short: album.tracks.data[i].title_short,
          title_version: album.tracks.data[i].title_version,
          type: album.tracks.data[i].type,
        };
        newArr.push(newObj);
      }
      setSongList(newArr);
    }
  };

  const setNowPlaying = (numOfSong: number) => {
    if (album !== undefined) {
      album.tracks.data.length !== 0 && dispatch(setPlaylist(songList));
      dispatch(setNumOfSong(numOfSong));
    }
  };

  //   let rgb = getAverageRGB(document.getElementById("albumImage"));

  //   function getAverageRGB(imgEl: any) {
  //     var blockSize = 5, // only visit every 5 pixels
  //       defaultRGB = {
  //         r: 0,
  //         g: 0,
  //         b: 0,
  //       }, // for non-supporting envs
  //       canvas = document.createElement("canvas"),
  //       context = canvas.getContext && canvas.getContext("2d"),
  //       data,
  //       width,
  //       height,
  //       i = -4,
  //       length,
  //       rgb = {
  //         r: 0,
  //         g: 0,
  //         b: 0,
  //       },
  //       count = 0;

  //     if (!context) {
  //       return defaultRGB;
  //     }

  //     height = canvas.height =
  //       imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  //     width = canvas.width =
  //       imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  //     context.drawImage(imgEl, 0, 0);

  //     try {
  //       data = context.getImageData(0, 0, width, height);
  //     } catch (e) {
  //       /* security error, img on diff domain */
  //       alert("x");
  //       return defaultRGB;
  //     }

  //     length = data.data.length;

  //     while ((i += blockSize * 4) < length) {
  //       ++count;
  //       rgb.r += data.data[i];
  //       rgb.g += data.data[i + 1];
  //       rgb.b += data.data[i + 2];
  //     }

  //     // ~~ used to floor values
  //     rgb.r = ~~(rgb.r / count);
  //     rgb.g = ~~(rgb.g / count);
  //     rgb.b = ~~(rgb.b / count);

  //     return rgb;
  //   }

  useEffect(() => {
    getAlbumDetails();
    album !== undefined && checkLengthOfTitle();
  }, []);

  useEffect(() => {
    album !== undefined && checkLengthOfTitle();
    album !== undefined && setTypesForNowPlaying();
  }, [album]);
  return (
    <>
      {album !== undefined && (
        <div className="album-main-container">
          <div className="album-first-container">
            <div className="album-image-container">
              <img
                id="albumImage"
                src={album.cover_medium}
                alt="album"
                className="album-image"
              />
            </div>
            <div className="album-details-container">
              <span className="album-type">
                {album.record_type.toUpperCase()}
              </span>
              <h1 id="albumTitle" className="album-title">
                {/* {checkLengthOfTitle(album.title)} */}
                {albumTitle}
              </h1>
              <div className="album-details">
                <img
                  src={album.artist.picture_small}
                  alt="album-artist"
                  className="album-artist"
                />
                <span className="album-artist-name">{album.artist.name}</span>
                <span>
                  {" "}
                  &#8226; {album.release_date.slice(0, 4)} &#8226;{" "}
                  {album.nb_tracks} songs,{" "}
                </span>
                <span className="album-duration">
                  {convertSecondToMinutesAlbum(album.duration)}
                </span>
              </div>
            </div>
          </div>
          <div className="album-second-container">
            <BtnPlay />
            <FiHeart className="big-love-icon" />
            <BtnThreeDotMenu />
          </div>
          <div className="album-third-container">
            <div className="album-info">
              <div className="album-info-first">
                <span className="album-first-col">#</span>
                <span className="album-first-col-title">TITLE</span>
              </div>
              <BiTime className="album-time-icon" />
            </div>
            {album.tracks.data.map((song, index) => (
              <div
                key={song.id}
                className="song-container"
                onDoubleClick={() => setNowPlaying(index)}
              >
                <div className="song-title-container">
                  <div className="song-list-number-container">
                    <span className="song-list-number">{index + 1}</span>
                  </div>
                  <div className="album-song-col2">
                    <span className="album-song-col2-title">
                      {song.title_short}
                    </span>
                    <span className="album-song-col2-artist-name">
                      {song.artist.name}
                    </span>
                  </div>
                </div>
                <div className="song-duration-container">
                  <SongDurationLike songDetails={songList[index]} />
                  <span>{convertSecondToMinutes(song.duration)}</span>
                  <SongDurationMenu />
                </div>
              </div>
            ))}
            <div className="album-label">
              <span>{album.label}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Album;
