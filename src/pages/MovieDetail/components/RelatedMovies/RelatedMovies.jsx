import React from "react";
import { CarouselCustom } from "../../../../common/CarouselCustom/CarouselCustom";
import { useRelatedMoviesQuery } from "../../../../hooks/useRelatedMovies";
import { Alert } from "react-bootstrap";

const RelatedMovies = ({ id }) => {
  const { data, isLoading, error, isError } = useRelatedMoviesQuery({ id });
  // console.log("11111111111111" + data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return <CarouselCustom data={data} />;
};

export default RelatedMovies;
