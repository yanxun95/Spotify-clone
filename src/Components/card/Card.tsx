import { Col } from "react-bootstrap";
import { cardDetails } from "./types";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import { CgPlayButton } from "react-icons/cg";

const Card = (item: cardDetails) => {
  let navigate = useNavigate();

  const navigatePage = (title: string, id: number | undefined) => {
    title === "artist" ? navigate(`/artist/${id}`) : navigate(`/album/${id}`);
  };

  return (
    <>
      {item.artistDetailsCard !== undefined && (
        <Col
          className="plr-item"
          //check in here why it won't work if the id is not include undefined
          onClick={() => navigatePage("artist", item.artistDetailsCard?.id)}
        >
          <div className="item-images-container">
            <img
              src={item.artistDetailsCard.picture}
              alt="artist"
              className="item-images-artist"
            />
            <CgPlayButton className="item-hover-play" />
          </div>
          <div className="plr-info">
            <span className="plr-item-name">{item.artistDetailsCard.name}</span>
            <span className="plr-item-info">
              {item.artistDetailsCard.type.charAt(0).toUpperCase() +
                item.artistDetailsCard.type.slice(1)}
            </span>
          </div>
        </Col>
      )}
      {item.albumtDetailsCard !== undefined && (
        <Col
          className="plr-item"
          onClick={() => navigatePage("album", item.albumtDetailsCard?.id)}
        >
          <div className="item-images-container">
            <img
              src={item.albumtDetailsCard.cover}
              alt="artist"
              className="item-images-square"
            />
            <CgPlayButton className="item-hover-play" />
          </div>
          <div className="plr-info">
            <span className="plr-item-name">
              {item.albumtDetailsCard.title}
            </span>
            <span className="plr-item-info">
              {item.albumtDetailsCard.type.charAt(0).toUpperCase() +
                item.albumtDetailsCard.type.slice(1)}
            </span>
          </div>
        </Col>
      )}
    </>
  );
};

export default Card;
