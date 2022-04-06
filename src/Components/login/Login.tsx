import "./login.scss";
import { GrSpotify } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Store/setup/hooks";
import { setUser } from "../../Store/user/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [currentUser, setCurrentUser] = useState({ _id: "1", name: "Guest" });
  const dispatch = useDispatch();

  const userSelector = useAppSelector((state) => state.user);

  const btnSetUser = () => {
    currentUser !== null && dispatch(setUser(currentUser));
  };

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
          <div className="btn-guest-login" onClick={() => btnSetUser()}>
            Login in as a guest
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
