import "./leftNavbar.scss";
import { GrSpotify, GrHomeRounded, GrFormAdd } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { FcLikePlaceholder } from "react-icons/fc";
import { CgArrowDownO } from "react-icons/cg";
import { Link } from "react-router-dom";

const LeftNavbar = () => {
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
            <li className="lnb-li">
              <GrHomeRounded className="lnb-li-icon" />
              <span className="lnb-li-font">Home</span>
            </li>
          </Link>
          <Link to={"/search"} className="lnb-li-link">
            <li className="lnb-li">
              <FiSearch className="lnb-li-icon" />
              <span className="lnb-li-font">Search</span>
            </li>
          </Link>
          <Link to={"/"} className="lnb-li-link">
            <li className="lnb-li">
              <BiBookmark className="lnb-li-icon" />
              <span className="lnb-li-font">Your Library</span>
            </li>
          </Link>
        </ul>
        <ul className="lnb-ul">
          <li className="lnb-li">
            <GrFormAdd className="lnb-li-icon" />
            <span className="lnb-li-font">Create Playlist</span>
          </li>
          <li className="lnb-li">
            <FcLikePlaceholder className="lnb-li-icon" />
            <span className="lnb-li-font">Liked Songs</span>
          </li>
        </ul>
        <div className="break-line">
          <div className="break-line-border"></div>
        </div>
        <ul className="lnb-playlist-ul">
          <li className="lnb-li">
            <span className="lnb-li-playlist-font">Legends Never Die</span>
          </li>
          <li className="lnb-li">
            <span className="lnb-li-playlist-font">Justice</span>
          </li>
        </ul>
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
