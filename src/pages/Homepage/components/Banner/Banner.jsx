import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return (
      <div>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}')`,
      }}
    >
      <div className="text-white banner-text-area" >
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
