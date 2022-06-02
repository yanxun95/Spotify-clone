import { Route, Routes } from "react-router-dom";

import "./main.scss";
import LeftNavbar from "../../Components/leftNavbar/LeftNavbar";
import NowPlaying from "../../Components/nowPlaying/NowPlaying";
import TopNavbar from "../../Components/topNavbar/TopNavbar";
import Homepage from "../homepage/Homepage";
import Artist from "../artist/Artist";
import Search from "../../Components/search/Search";
import Album from "../album/Album";
import Liked from "../album/Liked";

const Main = () => {
  return (
    <div className="main-container">
      <div className="top-container">
        <LeftNavbar />
        <div className="right-container">
          <TopNavbar />
          <Routes>
            <Route path="homepage" element={<Homepage />} />
            <Route path="artist/:id" element={<Artist />} />
            <Route path="search" element={<Search />} />
            <Route path="album/:id" element={<Album />} />
            <Route path="liked" element={<Liked />} />
          </Routes>
        </div>
      </div>
      <NowPlaying />
    </div>
  );
};

export default Main;
