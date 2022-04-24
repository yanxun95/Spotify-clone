import "./topNavbar.scss";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useAppSelector } from "../../Store/setup/hooks";
import { Dropdown } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";

const TopNavbar = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="tnb-container">
      <div className="tnb-left">
        <div className="tnb-btn-container">
          <MdKeyboardArrowLeft />
        </div>
        <div className="tnb-btn-container">
          <MdKeyboardArrowRight />
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
          <Dropdown.Item href="#/action-1">
            <span>Account</span>
            <BsBoxArrowUpRight />
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TopNavbar;
