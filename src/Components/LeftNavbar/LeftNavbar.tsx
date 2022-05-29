import "./leftNavbar.scss";
import { GrSpotify, GrHomeRounded, GrFormAdd } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { FcLikePlaceholder } from "react-icons/fc";
import { CgArrowDownO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useState } from "react";

const LeftNavbar = () => {
  const [temporaryIcon, setTemporaryIcon] = useState<string>("");

  const selectedIcon = (id: string) => {
    const currentIcon = document.getElementById(id);
    const previousIcon = document.getElementById(temporaryIcon);
    currentIcon !== null && currentIcon.classList.add("lnb-li-font-white");
    previousIcon !== null && previousIcon.classList.remove("lnb-li-font-white");
    setTemporaryIcon(id);
  };

  return (
    <div className="lnb-container">
      <div className="lnb-sec-container">
        <div className="spotify-logo-container">
          <GrSpotify className="spotify-logo" />
          <span className="spotify-logo-font">
            Spotify<span className="trademark">&reg;</span>
          </span>
        </div>
        <ul className="lnb-ul">
          <Link to={"/homepage"} className="lnb-li-link">
            <li
              id="lnbHome"
              className="lnb-li"
              onClick={() => selectedIcon("lnbHome")}
            >
              <GrHomeRounded className="lnb-li-icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to={"/search"} className="lnb-li-link">
            <li
              id="lnbSearch"
              className="lnb-li"
              onClick={() => selectedIcon("lnbSearch")}
            >
              <FiSearch className="lnb-li-icon" />
              <span>Search</span>
            </li>
          </Link>
          <Link to={"/search"} className="lnb-li-link">
            <li
              id="lnbLibrary"
              className="lnb-li"
              onClick={() => selectedIcon("lnbLibrary")}
            >
              <BiBookmark className="lnb-li-icon" />
              <span>Your Library</span>
            </li>
          </Link>
        </ul>
        <ul className="lnb-ul">
          <li
            id="lnbPlaylist"
            className="lnb-li"
            onClick={() => selectedIcon("lnbPlaylist")}
          >
            <GrFormAdd className="lnb-li-icon" />
            <span>Create Playlist</span>
          </li>
          <Link to={"/album/liked"} className="lnb-li-link">
            <li
              id="lnbLikied"
              className="lnb-li"
              onClick={() => selectedIcon("lnbLikied")}
            >
              <FcLikePlaceholder className="lnb-li-icon" />
              <span>Liked Songs</span>
            </li>
          </Link>
        </ul>
        <div className="break-line">
          <div className="break-line-border"></div>
        </div>
        {/* <ul className="lnb-playlist-ul">
          <li className="lnb-li">
            <span className="lnb-li-playlist-font">Legends Never Die</span>
          </li>
          <li className="lnb-li">
            <span className="lnb-li-playlist-font">Justice</span>
          </li>
        </ul> */}
        <div className="install-app-container">
          <div className="install-app-in-container">
            <CgArrowDownO className="install-app-icon" />
            <span>Install App</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
