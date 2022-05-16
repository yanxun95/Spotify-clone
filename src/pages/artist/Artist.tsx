import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  albumDetails,
  artistDetails,
  songsDetails,
} from "../../Components/types/types";
import "./artist.scss";
import PlaylistRow from "../../Components/playlistRow/PlaylistRow";
import BtnPlay from "../../Components/btnPlay/BtnPlay";
import BtnThreeDotMenu from "../../Components/btnThreeDotMenu/BtnThreeDotMenu";
import SongDurationLike from "../../Components/songDurationLike/SongDurationLike";
import SongDurationMenu from "../../Components/songDurationMenu/SongDurationMenu";
import { convertSecondToMinutes } from "../../Components/function/Function";

const Artist = () => {
  let artistId = useParams().id;
  const [artistsInfo, setArtistsInfo] = useState<artistDetails>();
  const [songList, setSongList] = useState<Array<songsDetails>>([]);
  const [albumList, setAlbumList] = useState<Array<albumDetails>>([]);
  let [seeMore, setSeeMore] = useState<boolean>(true);

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

  const getArtistInfo = async () => {
    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`,
        options
      );
      if (response.ok) {
        let result = await response.json();
        setArtistsInfo(result);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchArtistbyName = async () => {
    if (artistsInfo !== undefined) {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistsInfo?.name}`,
          options
        );
        if (response.ok) {
          let result = await response.json();
          console.log(result);
          setPopularSongs(result.data);
          getAlbumList(result.data);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setPopularSongs = (arr: songsDetails[]) => {
    let smallSongList: songsDetails[] = [];
    arr.forEach((song: songsDetails) => {
      song.title_short.includes("Undefined") === false &&
        song.title_short.includes("undefined") === false &&
        smallSongList.push(song);
    });
    setSongList(smallSongList.slice(0, 10));
  };

  const getAlbumList = (arr: songsDetails[]) => {
    let smallAblumList: albumDetails[] = [];
    arr.forEach((song: songsDetails) => {
      song.album.title.includes("Undefined") === false &&
        song.album.title.includes("undefined") === false &&
        smallAblumList.push(song.album);
    });
    smallAblumList = removeDuplicateAlbum(smallAblumList);
    setAlbumList(smallAblumList);
  };

  const removeDuplicateAlbum = (albums: albumDetails[]) => {
    let smallAblumListWithoutDuplicate: albumDetails[] = [];
    albums.forEach((album) => {
      let sameTitle = !!smallAblumListWithoutDuplicate.find(
        (uniqueAlbum) => uniqueAlbum.title === album.title
      );
      if (!sameTitle) {
        smallAblumListWithoutDuplicate.push(album);
      }
    });
    return smallAblumListWithoutDuplicate;
  };

  const btnSeeMore = () => {
    setSeeMore(!seeMore);
    let getSeeMore = document.querySelectorAll(".song-container");
    if (!!seeMore) {
      for (let i = 5; i < getSeeMore.length; i++) {
        getSeeMore !== null && getSeeMore[i].classList.add("display-see-more");
      }
    } else {
      for (let i = 5; i < getSeeMore.length; i++) {
        getSeeMore !== null &&
          getSeeMore[i].classList.remove("display-see-more");
      }
    }
  };

  useEffect(() => {
    getArtistInfo();
  }, []);

  useEffect(() => {
    searchArtistbyName();
  }, [artistsInfo]);

  return (
    <>
      {artistsInfo !== undefined && songList.length !== 0 && (
        <div className="artist-main-container">
          <div className="artist-first-container">
            <div className="artist-image-container">
              <img
                src={artistsInfo.picture_medium}
                alt="aritst"
                className="artist-picture"
              />
            </div>
            <div className="artist-info-container">
              <span className="artist-name">{artistsInfo.name}</span>
              <span className="artist-fans">
                {artistsInfo.nb_fan !== undefined &&
                  artistsInfo.nb_fan.toLocaleString("en-US")}{" "}
                fans
              </span>
            </div>
          </div>
          <div className="artist-second-container">
            <BtnPlay />
            <div className="btn-artist-follow">FOLLOW</div>
            <BtnThreeDotMenu />
          </div>
          <div className="artist-third-container">
            <h4 className="artist-section-title">Popular</h4>
            <div className="artist-song-container">
              {songList.map((song, index) => (
                <div key={song.id} className="song-container">
                  <div className="song-title-container">
                    <div className="song-list-number-container">
                      <span className="song-list-number">{index + 1}</span>
                    </div>
                    <img
                      src={song.album.cover_small}
                      alt="album images"
                      className="song-album-image"
                    />
                    <span>{song.title_short}</span>
                  </div>
                  <div className="song-duration-container">
                    <SongDurationLike />
                    <span>{convertSecondToMinutes(song.duration)}</span>
                    <SongDurationMenu />
                  </div>
                </div>
              ))}
              {/* {console.log(songList[0].id)} */}
            </div>
            <div className="btn-see-more-container">
              <span className="btn-see-more" onClick={() => btnSeeMore()}>
                SEE MORE
              </span>
            </div>
            <PlaylistRow title={"Album"} albums={albumList} />
          </div>
        </div>
      )}
    </>
  );
};

export default Artist;
