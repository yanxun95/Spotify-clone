import { Container, Row } from "react-bootstrap";
import { itemDetails } from "../types/types";
import { playlistProps } from "./types";
import "./playlistRow.scss";
import Card from "../card/Card";

const PlaylistRow = (playlist: playlistProps) => {
  return (
    <>
      {/* {playlist.list.length === 9 && ( */}
      <div className="plr-main-container">
        <div className="plr-first-container">
          <h3 className="plr-title">{playlist.title}</h3>
          <span className="btn-see-all">SEE ALL</span>
        </div>
        <Container className="plr-second-container">
          <Row className="plr-row">
            {playlist.list.map((item: itemDetails) => (
              <Card title="artist" cardDetails={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </div>
      {/* )} */}
    </>
  );
};

export default PlaylistRow;
