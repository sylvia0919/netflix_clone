import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetal";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import "./MovieDetailPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleRoof,
  faPepperHot,
  faRankingStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Review from "./components/Review/Review";
import RelatedMovies from "./components/RelatedMovies/RelatedMovies";
import { usePreviewQuery } from "../../hooks/usePreview";
import YouTube from "react-youtube";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetailQuery(id);
  const { data: genreData } = useMovieGenreQuery();
  const { data: preview } = usePreviewQuery(id);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((item) => {
      const genreObj = genreData.find((genre) => genre.id === item.id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const opts = {
    height: "390",
    width: "640",
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <img
            width={350}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
          />
        </Col>

        <Col>
          <div>
            {showGenre(data?.genres).map((genre, idx) => (
              <Badge bg="danger" key={idx} style={{ margin: "2px" }}>
                {genre}
              </Badge>
            ))}
          </div>
          <br />
          <h1>{data.title}</h1>
          <h3>{data.tagline}</h3>
          <div className="movie-info-sub">
            <div>
              <FontAwesomeIcon icon={faRankingStar} /> {data.vote_average}
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} /> {Math.floor(data.popularity)}
            </div>
            <div>
              {data.adult ? (
                <FontAwesomeIcon icon={faPepperHot} />
              ) : (
                <FontAwesomeIcon icon={faPeopleRoof} />
              )}
            </div>
          </div>
          <hr />
          <div>{data.overview}</div>
          <hr />
          <div className="detail-info">
            <div>
              <Badge bg="warning" text="dark" style={{ margin: "2px" }}>
                Budget
              </Badge>{" "}
              $ {data.budget}
            </div>

            <div>
              <Badge bg="warning" text="dark" style={{ margin: "2px" }}>
                Revenue
              </Badge>{" "}
              $ {data.revenue}
            </div>
            <div>
              <Badge bg="warning" text="dark" style={{ margin: "2px" }}>
                Release Date
              </Badge>{" "}
              {data.release_date}
            </div>
            <div>
              <Badge bg="warning" text="dark" style={{ margin: "2px" }}>
                Runtime
              </Badge>
              {data.runtime} min
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <h2>Preview</h2>
      <Button variant="light" onClick={handleShow}>
        Watch the trailer
      </Button>
      <Modal
        data-bs-theme="dark"
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='video-container'>
          <YouTube videoId={preview?.results[0].key} opts={opts} />
          </div>
        </Modal.Body>
      </Modal>
      <br />
      <br />
      <h2>Review</h2>
      <Row>
        <Col>
          <Review id={id} />
        </Col>
      </Row>
      <br />
      <h2>Recommendations</h2>
      <Row>
        <Col>
          <RelatedMovies id={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
