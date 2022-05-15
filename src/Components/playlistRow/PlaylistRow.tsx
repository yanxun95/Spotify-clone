import { Container, Row } from "react-bootstrap";
import { albumDetails, artistDetails } from "../types/types";
import { rowProps } from "./types";
import "./playlistRow.scss";
import Card from "../card/Card";

const PlaylistRow = (prop: rowProps) => {
  return (
    <>
      <div className="plr-main-container">
        <div className="plr-first-container">
          <h3 className="plr-title">{prop.title}</h3>
          <span className="btn-see-all">SEE ALL</span>
        </div>
        <Container className="plr-second-container">
          <Row className="plr-row">
            {prop.artists !== undefined &&
              prop.artists.map((item: artistDetails) => (
                <Card artistDetailsCard={item} key={item.id} />
              ))}
            {prop.albums !== undefined &&
              prop.albums.map((item: albumDetails) => (
                <Card albumtDetailsCard={item} key={item.id} />
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PlaylistRow;
