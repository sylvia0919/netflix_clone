import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { CarouselCustom } from "../../../../common/CarouselCustom/CarouselCustom";

const PopularMovieSlide = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <h3>Popular Movies</h3>
      <CarouselCustom data={data} />
    </div>
  );
};

export default PopularMovieSlide;
