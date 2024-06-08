import React from "react";
import { Alert } from "react-bootstrap";
import { useTopratedMoviesQuery } from "../../../../hooks/useTopratedMoviesQuery";
import { CarouselCustom } from "../../../../common/CarouselCustom/CarouselCustom";

const TopratedMovies = () => {
  const { data, isLoading, error, isError } = useTopratedMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <h3>Top rated Movies</h3>
      <CarouselCustom data={data} />
    </div>
  );
};

export default TopratedMovies;
