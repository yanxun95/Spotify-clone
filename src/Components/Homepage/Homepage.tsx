import { useEffect, useState } from "react";
import "./homepage.scss";
import PlaylistRow from "../playlistRow/PlaylistRow";
import { itemDetails } from "../types/types";

const Homepage = () => {
  const [greeting, setGreeting] = useState("");
  const artists = [
    "13",
    "12246",
    "384236",
    "8706544",
    "9635624",
    "288166",
    "4050205",
    "7543848",
    "292185",
  ];
  const [artistsList, setArtistsList] = useState<itemDetails[]>([]);

  let currentDate = new Date();
  let time = currentDate.getHours();

  let key: string;
  if (process.env.REACT_APP_RAPIDAPI_KEY) {
    key = process.env.REACT_APP_RAPIDAPI_KEY;
  } else {
    throw new Error("REACT_APP_RAPIDAPI_KEY is not set");
  }

  const checkTime = () => {
    if (time >= 5 && time < 12) {
      setGreeting("Good morning");
    } else if (time >= 12 && time < 18) {
      setGreeting("Good afternoon");
    } else if (time >= 18 && time < 24) {
      setGreeting("Good evening");
    } else {
      setGreeting("Hello");
    }
  };

  const init = () => {
    let artistsListArr: itemDetails[] = [];
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": key,
      },
    };
    artists.forEach(async (artist, index) => {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/${artist}`,
          options
        );
        if (response.ok) {
          let result: itemDetails = await response.json();
          artistsListArr.push(result);
          if (index === 8) {
            setArtistsList(artistsListArr);
          }
          // setArtistsList([...artistsList, result]);
          // console.log(artistsList, result);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    checkTime();
    init();
  }, []);

  // useEffect(() => {
  //   console.log(artistsList);
  // }, [artistsList.length]);

  return (
    <>
      {artistsList.length !== 0 && (
        <div className="hp-container">
          <h2 className="header2">{greeting}</h2>
          <PlaylistRow title={"Artists"} list={artistsList} />
        </div>
      )}
    </>
  );
};

export default Homepage;
