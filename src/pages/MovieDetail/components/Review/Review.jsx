import React from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieReviews";
import ReviewBox from "./ReviewBox";
import { Alert } from "react-bootstrap";
import ReviewBoxNull from "./ReviewBoxNull";

const Review = ({ id }) => {
  const { data, isLoading, error, isError } = useMovieReviewsQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      {(Object.values(data.results).length===0) && <ReviewBoxNull />}

      {data?.results.map((data) => (
        <ReviewBox author={data.author} content={data.content} />
      ))}
    </div>
  );
};

export default Review;
