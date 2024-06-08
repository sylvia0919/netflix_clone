import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleRoof,
  faPepperHot,
  faRankingStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate=useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      className="movie-card"
      onClick={()=>{navigate(`/movies/${movie.id}`)}}
      style={{
        backgroundImage: `url('https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}')`,
      }}
    >
      <div className="over-lay">
        <h1 style={{ fontSize: "1.5rem" }}>{movie.title}</h1>
        <div className="movie-info">
          {showGenre(movie.genre_ids).map((genre, idx) => (
            <Badge bg="danger" key={idx} style={{ margin: "2px" }}>
              {genre}
            </Badge>
          ))}
          <div className="movie-info-sub">
            <div>
              <FontAwesomeIcon icon={faRankingStar} /> {movie.vote_average}
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} /> {Math.floor(movie.popularity)}
            </div>
            <div>
              {movie.adult ? (
                <FontAwesomeIcon icon={faPepperHot} />
              ) : (
                <FontAwesomeIcon icon={faPeopleRoof} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
