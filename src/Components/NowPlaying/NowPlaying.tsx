import { useAppSelector } from "../../Store/setup/hooks";
import "./nowPlaying.scss";
import { FiHeart } from "react-icons/fi";
import { TiArrowShuffle, TiArrowLoop } from "react-icons/ti";
import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
} from "react-icons/bs";
import { CgLaptop } from "react-icons/cg";
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from "react-icons/hi";
import { MdOutlineQueueMusic } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNumOfSong } from "../../Store/playing/numOfSongSlice";
import { setPlaylist } from "../../Store/playing/playingSlice";
import { songsDetails } from "../types/types";

const NowPlaying = () => {
  const playlist = useAppSelector((state) => state.playlist);
  const numberOfSong = useAppSelector((state) => state.numOfSong);
  const [volumeValue, setVolumeValue] = useState<number>(50);
  const [temporaryVolume, setTemporaryVolume] = useState<number>(0);
  const [songDuration, setSongDuration] = useState<number>(0);
  const [songCurrentDuration, setSongCurrentDuration] = useState<number>(0);
  const [temporaryPlaylist, setTemporaryPlaylist] = useState<
    Array<songsDetails>
  >([]);
  const [suffer, setSuffer] = useState<Boolean>(true);
  const dispatch = useDispatch();
  let audio = document.getElementById("audioElement") as HTMLAudioElement;
  audio !== null && (audio.volume = Number((volumeValue / 100).toFixed(1)));

  const playMusic = (action: string) => {
    const btnPlay = document.getElementById("npBtnPlay");
    const btnPause = document.getElementById("npBtnPause");
    if (action === "play") {
      if (btnPlay !== null && btnPause !== null && audio !== null) {
        btnPlay.classList.add("hide-item");
        btnPause.classList.add("display-item");
        audio.onloadeddata = function () {
          songDurationInit();
        };
        audio.play();
        audio.ontimeupdate = function () {
          updateCurrentTime();
        };
        audio.onended = function () {
          nextSong();
        };
      }
    } else {
      if (btnPlay !== null && btnPause !== null) {
        btnPlay.classList.remove("hide-item");
        btnPause.classList.remove("display-item");
        audio.pause();
      }
    }
  };

  const songDurationInit = () => {
    let audioDurationSpan = document.getElementById("audioDuration");
    let audioDuration = Math.round(audio.duration).toString();
    setSongDuration(Number(audioDuration));
    audioDuration.length === 2 && (audioDuration = "0:" + audioDuration);
    audioDurationSpan !== null && (audioDurationSpan.innerHTML = audioDuration);
  };

  const updateCurrentTime = () => {
    let currentTimeSpan = document.getElementById("audioCurrentTime");
    let currentTime = audio.currentTime.toFixed(0).toString();
    setSongCurrentDuration(Number(currentTime));
    currentTime.length === 1
      ? (currentTime = "0:0" + audio.currentTime.toFixed(0).toString())
      : (currentTime = "0:" + audio.currentTime.toFixed(0).toString());

    currentTimeSpan !== null && (currentTimeSpan.innerHTML = currentTime);
  };

  const nextSong = () => {
    let currentSong = numberOfSong;
    if (currentSong === playlist.length - 1) {
      dispatch(setNumOfSong(0));
    } else {
      dispatch(setNumOfSong((currentSong += 1)));
    }
  };

  const previousSong = () => {
    let currentSong = numberOfSong;
    if (currentSong === 0) {
      dispatch(setNumOfSong(playlist.length - 1));
    } else {
      dispatch(setNumOfSong((currentSong -= 1)));
    }
  };

  const controlDurationSong = (event: Event, value: number | number[]) => {
    let newDuration = Number(value);
    audio.currentTime = newDuration;
  };

  const controlVolume = (event: Event, value: number | number[]) => {
    let newVolume = Number(value);
    setVolumeValue(newVolume);
  };

  const sufferList = () => {
    const btnSuffer = document.getElementById("btnSuffer");
    if (suffer) {
      let arr = JSON.parse(JSON.stringify(playlist));
      let currentIndex = arr.length,
        randomIndex;

      setTemporaryPlaylist(playlist);

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [
          arr[randomIndex],
          arr[currentIndex],
        ];
      }
      initPlaybtn();
      btnSuffer !== null && btnSuffer.classList.add("set-color-dark-green");
      dispatch(setPlaylist(arr));
    } else {
      dispatch(setPlaylist(temporaryPlaylist));
      btnSuffer !== null && btnSuffer.classList.remove("set-color-dark-green");
      initPlaybtn();
    }
    setSuffer(!suffer);
  };

  const mute = (action: string) => {
    const volume = document.getElementById("volumeSound");
    const volumeMute = document.getElementById("volumeMute");
    if (action === "sound") {
      if (volume !== null && volumeMute !== null) {
        volume.classList.add("hide-item");
        volumeMute.classList.add("display-item");
        setTemporaryVolume(volumeValue);
        setVolumeValue(0);
      }
    } else {
      if (volume !== null && volumeMute !== null) {
        volume.classList.remove("hide-item");
        volumeMute.classList.remove("display-item");
        setVolumeValue(temporaryVolume);
      }
    }
  };

  const initPlaybtn = () => {
    const btnPlay = document.getElementById("npBtnPlay");
    const btnPause = document.getElementById("npBtnPause");
    if (btnPlay !== null && btnPause !== null) {
      btnPlay.classList.remove("hide-item");
      btnPause.classList.remove("display-item");
    }
  };

  useEffect(() => {
    playMusic("play");
  }, [numberOfSong]);

  useEffect(() => {
    initPlaybtn();
  }, []);

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     const btnPlay = document.getElementById("npBtnPlay");
  //     const btnPause = document.getElementById("npBtnPause");
  //     if (btnPlay !== null && btnPause !== null) {
  //       btnPlay.classList.remove("hide-item");
  //       btnPause.classList.remove("display-item");
  //     }
  //     console.log("been run");
  //   };

  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);

  return (
    <div className="np-container">
      <div className="np-first-container">
        <img
          src={playlist[numberOfSong].album.cover}
          alt="album"
          className="np-album-cover"
        />
        <div className="np-details">
          <span className="np-song-title">
            {playlist[numberOfSong].title_short}
          </span>
          <span className="np-song-artist">
            {playlist[numberOfSong].artist.name}
          </span>
        </div>
        <FiHeart className="np-like" />
      </div>
      <div className="np-seconnd-container">
        <div className="np-play-bar">
          <TiArrowShuffle id="btnSuffer" onClick={sufferList} />
          <BsFillCaretLeftFill onClick={previousSong} />
          <div className="np-play-container">
            <BsPlayCircleFill
              id="npBtnPlay"
              className="np-btn-play"
              onClick={() => playMusic("play")}
            />
            <BsPauseCircleFill
              id="npBtnPause"
              className="np-btn-pause"
              onClick={() => playMusic("pause")}
            />
          </div>
          <BsFillCaretRightFill onClick={nextSong} />
          <TiArrowLoop />
        </div>
        <div className="np-progress">
          <span id="audioCurrentTime">0:00</span>
          <div className="progress-bar-container">
            <audio
              id="audioElement"
              src={playlist[numberOfSong].preview}
              preload={"auto"}
            />
            <Slider
              size="small"
              aria-label="Small"
              className="slider-bar"
              value={songCurrentDuration}
              min={0}
              max={songDuration}
              onChange={controlDurationSong}
            />
          </div>
          <span id="audioDuration">0:31</span>
        </div>
      </div>
      <div className="np-third-container">
        <MdOutlineQueueMusic />
        <CgLaptop />
        <div className="np-volume-container">
          <HiOutlineVolumeUp id="volumeSound" onClick={() => mute("sound")} />
          <HiOutlineVolumeOff
            id="volumeMute"
            className="hide-item"
            onClick={() => mute("mute")}
          />
          <Slider
            size="small"
            value={volumeValue}
            aria-label="Small"
            onChange={controlVolume}
            className="slider-bar btn-voloum-bar"
          />
        </div>
        <FaExpandAlt />
      </div>
    </div>
  );
};

export default NowPlaying;
