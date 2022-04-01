import "./leftNavbar.scss";

const LeftNavbar = () => {
  return (
    <div className="navbar-left">
      <div className="navbar-left-contaier">
        <div className="container logo">
          <i className="fab fa-spotify"></i>
          <span className="spotify-font-logo">
            Spotify<span className="trademark">&reg;</span>
          </span>
        </div>
        <ul className="container nav-col">
          <li className="container">
            <i className="bi bi-house-door"></i>
            <span className="col-font">Home</span>
          </li>
          <li className="container">
            <i className="bi bi-search"></i>
            <span className="col-font">Search</span>
          </li>
          <li className="container">
            <i className="bi bi-list"></i>
            <span className="col-font">Your Library</span>
          </li>
        </ul>
        <div className="container nav-col second-nav-col">
          <div className="container">
            <i className="bi bi-plus-square-fill"></i>
            <span className="col-font">Create Playlist</span>
          </div>
          <div className="container">
            <i className="bi bi-heart"></i>
            <span className="col-font">Liked Songs</span>
          </div>
        </div>
        <div className="container">
          <div className="container under-border"></div>
        </div>
        <div className="container nav-playlist">
          <div className="container playlist-item">
            <span className="nav-playlist-font">Legends Never Die</span>
          </div>
          <div className="container playlist-item">
            <span className="nav-playlist-font">Justice</span>
          </div>
        </div>
        <div className="install-app">
          <i className="bi bi-arrow-down-circle"></i>
          <span>Install App</span>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
