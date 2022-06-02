import { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { useDispatch } from "react-redux";
import AlbumContainer from "../../Components/albumContainer/AlbumContainer";
import { convertSecondToMinutes } from "../../Components/function/Function";
import SongDurationLike from "../../Components/songDurationLike/SongDurationLike";
import SongDurationMenu from "../../Components/songDurationMenu/SongDurationMenu";
import { setNumOfSong } from "../../Store/playing/numOfSongSlice";
import { setPlaylist } from "../../Store/playing/playingSlice";
import { useAppSelector } from "../../Store/setup/hooks";
import "./album.scss";
import { likeMoreDeatils } from "./types";
import { useNavigate } from "react-router-dom";

const Liked = () => {
  const likedSongs = useAppSelector((state) => state.likedSongs);
  const [album, setAlbum] = useState<likeMoreDeatils>();
  const [totalDurationOfPlaylist, setTotalDurationOfPlaylist] =
    useState<number>(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const initAlbum = () => {
    let album = {
      artist: {
        id: 0,
        link: "",
        name: "Guest",
        nb_album: 0,
        nb_fan: 0,
        picture: "",
        picture_big: "",
        picture_medium: "",
        picture_small:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
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
      cover_medium:
        "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
      cover_small: "",
      cover_xl: "",
      duration: totalDurationOfPlaylist,
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
      nb_tracks: likedSongs.length,
      record_type: "playlist",
      release_date: "2022-05-26",
      share: "",
      title: "Liked Songs",
      tracklist: "",
      tracks: {
        data: likedSongs,
      },
      type: "",
      upc: "",
    };
    setAlbum(album);
  };

  const getTotalDurationOfPlaylist = () => {
    let totalDuration = 0;
    if (likedSongs !== undefined) {
      for (let i = 0; i < likedSongs.length; i++) {
        totalDuration += likedSongs[i].duration;
      }
    }
    setTotalDurationOfPlaylist(totalDuration);
  };

  const setNowPlaying = (numOfSong: number) => {
    if (album !== undefined) {
      album.tracks.data.length !== 0 && dispatch(setPlaylist(likedSongs));
      dispatch(setNumOfSong(numOfSong));
    }
  };

  const navigatePage = (id: number | undefined) => {
    navigate(`/album/${id}`);
  };

  useEffect(() => {
    getTotalDurationOfPlaylist();
    totalDurationOfPlaylist !== 0 && initAlbum();
  }, []);

  useEffect(() => {
    initAlbum();
  }, [likedSongs]);
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
              <div className="album-info-first">
                <div className="album-title-album">ALBUM</div>
                <BiTime className="album-time-icon" />
              </div>
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
                  <div className="like-song-with-img">
                    <img
                      src={song.album.cover}
                      alt="album"
                      className="song-album-image"
                    />
                    <div className="album-song-col2">
                      <span className="album-song-col2-title">
                        {song.title_short}
                      </span>
                      <span className="album-song-col2-artist-name">
                        {song.artist.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="song-duration-container">
                  <div
                    className="song-ablum-title"
                    onClick={() => navigatePage(song.album.id)}
                  >
                    {song.album.title}
                  </div>
                  <SongDurationLike
                    songDetails={likedSongs[index]}
                    title={"liked"}
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

export default Liked;
