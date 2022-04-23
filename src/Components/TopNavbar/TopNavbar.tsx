import "./topNavbar.scss";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useAppSelector } from "../../Store/setup/hooks";
import { AiFillCaretDown } from "react-icons/ai";
import { Dropdown, DropdownButton } from "react-bootstrap";

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
      {/* <div className="tnb-right">
        <img src={user.userImg} alt="userImg" className="tnb-user-img" />
        <span className="tnb-user-name">{user.name}</span>
        <AiFillCaretDown />
      </div> */}
      <DropdownButton id="dropdown-basic-button" title={user.name}>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default TopNavbar;
