import "./login.scss";
import { GrSpotify } from "react-icons/gr";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-main-container">
      <div className="login-spotify-logo-container">
        <GrSpotify className="login-spotify-logo" />
        <span className="login-spotify-logo-font">
          Spotify<span className="login-trademark">&reg;</span>
        </span>
      </div>
      <div className="login-line"></div>
      <div className="login-section">
        <Link to={"/homepage"} className="btn-link">
          <div className="btn-guest-login">Login in as a guest</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
