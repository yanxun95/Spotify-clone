import "./topNavbar.scss";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useAppSelector } from "../../Store/setup/hooks";
import { Dropdown } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const TopNavbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  return (
    <div className="tnb-container">
      <div className="tnb-left">
        <div className="tnb-btn-container">
          <MdKeyboardArrowLeft onClick={() => navigate(-1)} />
        </div>
        <div className="tnb-btn-container">
          <MdKeyboardArrowRight onClick={() => navigate(1)} />
        </div>
      </div>

      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="tnb-right"
        >
          <img src={user.userImg} alt="userImg" className="tnb-user-img" />
          <span>{user.name}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className="tnb-dropdown-menu">
          <Dropdown.Item>
            <span>Account</span>
            <BsBoxArrowUpRight />
          </Dropdown.Item>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/")}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TopNavbar;
