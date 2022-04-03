import "./topNavbar.scss";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const TopNavbar = () => {
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
      <div className="tnb-right"></div>
    </div>
  );
};

export default TopNavbar;
