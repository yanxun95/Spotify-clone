import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { albumMoreDeatils } from "../../Components/types/types";
import "./album.scss";
import SongDurationLike from "../../Components/songDurationLike/SongDurationLike";
import SongDurationMenu from "../../Components/songDurationMenu/SongDurationMenu";
import { convertSecondToMinutes } from "../../Components/function/Function";
import { BiTime } from "react-icons/bi";
import { setNumOfSong } from "../../Store/playing/numOfSongSlice";
import { setPlaylist } from "../../Store/playing/playingSlice";
import { useDispatch } from "react-redux";
import { songsDetails } from "../../Components/types/types";
import AlbumContainer from "../../Components/albumContainer/AlbumContainer";

const Album = () => {
  let albumId = useParams().id;
  const [album, setAlbum] = useState<albumMoreDeatils>();
  const [songList, setSongList] = useState<Array<songsDetails>>([]);
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
    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`,
        options
      );
      if (response.ok) {
        let result = await response.json();
        setAlbum(result);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setTypesForNowPlaying = () => {
    let newArr = [];
    if (album !== undefined) {
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

  useEffect(() => {
    getAlbumDetails();
  }, []);

  useEffect(() => {
    album !== undefined && setTypesForNowPlaying();
  }, [album]);
  return (
    <>
      {album !== undefined && (
        <div className="album-main-container">
          <AlbumContainer album={album} />
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
                  <SongDurationLike
                    songDetails={songList[index]}
                    title={"album"}
                  />
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
