import { Route, Routes } from "react-router-dom";
import LeftNavbar from "../../Components/leftNavbar/LeftNavbar";
import NowPlaying from "../../Components/nowPlaying/NowPlaying";
import TopNavbar from "../../Components/topNavbar/TopNavbar";
import Homepage from "../homepage/Homepage";
import "./main.scss";
import Search from "../../Components/search/Search";
import Artist from "../artist/Artist";
import Album from "../album/Album";

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
            <Route path="album/:id" element={<Album title="album" />} />
            <Route path="album/liked" element={<Album title="liked" />} />
          </Routes>
        </div>
      </div>
      <NowPlaying />
    </div>
  );
};

export default Main;
