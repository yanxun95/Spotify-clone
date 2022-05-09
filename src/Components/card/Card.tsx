import { Col } from "react-bootstrap";
import { cardDetails } from "./types";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import { CgPlayButton } from "react-icons/cg";

const Card = (item: cardDetails) => {
  let navigate = useNavigate();

  const btnArtist = (id: number) => {
    navigate(`/artist/${id}`);
  };
  return (
    <Col className="plr-item" onClick={() => btnArtist(item.cardDetails.id)}>
      <div className="item-images-container">
        <img
          src={item.cardDetails.picture}
          alt="artist"
          className="item-images-artist"
        />
        <CgPlayButton className="item-hover-play" />
      </div>
      <div className="plr-info">
        <span className="plr-item-name">{item.cardDetails.name}</span>
        <span className="plr-item-info">
          {item.cardDetails.type.charAt(0).toUpperCase() +
            item.cardDetails.type.slice(1)}
        </span>
      </div>
    </Col>
  );
};

export default Card;
