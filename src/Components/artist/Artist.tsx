import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artistDetails } from "../types/types";
import "./artist.scss";
import { CgPlayButton } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";
import { Col, Container, Row } from "react-bootstrap";
import { songsDetails } from "./types";

const Artist = () => {
  let artistId = useParams().id;
  const [artistsInfo, setArtistsInfo] = useState<artistDetails>();
  const [songList, setSongList] = useState<Array<songsDetails>>([]);

  let key: string;
  if (process.env.REACT_APP_RAPIDAPI_KEY) {
    key = process.env.REACT_APP_RAPIDAPI_KEY;
  } else {
    throw new Error("REACT_APP_RAPIDAPI_KEY is not set");
  }

  const getArtistInfo = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": key,
      },
    };

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

  const getPopularSongs = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": key,
      },
    };

    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistsInfo?.name}`,
        options
      );
      if (response.ok) {
        let result = await response.json();
        let smallSongList: songsDetails[] = [];
        result.data.forEach((song: songsDetails) => {
          song.title_short.includes("Undefined") === false &&
            song.title_short.includes("undefined") === false &&
            smallSongList.push(song);
        });
        setSongList(smallSongList.slice(0, 10));
        console.log(songList);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertSecondToMinutes = (duration: number) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    getArtistInfo();
    getPopularSongs();
  }, []);

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
            <CgPlayButton className="artist-btn-big-play" />
            <div className="btn-artist-follow">FOLLOW</div>
            <FiMoreHorizontal className="artist-follow-menu" />
          </div>
          <div className="artist-third-container">
            <h4 className="artist-section-title">Popular</h4>
            <Container className="artist-song-table">
              {songList.map((song, index) => (
                <Row key={song.id} className="artist-pupular-container">
                  <Col>{index + 1}</Col>
                  <Col>
                    <img
                      src={song.album.cover_small}
                      alt="album images"
                      className="artist-popular-album-image"
                    />
                  </Col>
                  <Col>{song.title_short}</Col>
                  <Col>{convertSecondToMinutes(song.duration)}</Col>
                </Row>
              ))}
              {/* {console.log(songList[0].id)} */}
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Artist;
