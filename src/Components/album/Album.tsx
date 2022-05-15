import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { albumMoreDeatils } from "./types";
import "./album.scss";

const Album = () => {
  let albumId = useParams().id;
  const [album, setAlbum] = useState<albumMoreDeatils>();
  const [albumTitle, setAlbumTitle] = useState<String>();

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

  const convertSecondToMinutes = (duration: number) => {
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
                  {convertSecondToMinutes(album.duration)}
                </span>
              </div>
            </div>
          </div>
          <div className="album-second-container"></div>
        </div>
      )}
    </>
  );
};

export default Album;
