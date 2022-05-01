import { Col } from "react-bootstrap";
import { cardDetails } from "./types";
import "./card.scss";

const Card = (item: cardDetails) => {
  return (
    <Col className="plr-item">
      <div className="item-images-container">
        <img
          src={item.cardDetails.picture}
          alt="artist"
          className="item-images-artist"
        />
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
