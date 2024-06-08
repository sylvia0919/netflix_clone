import React from 'react'
import { Alert } from 'react-bootstrap';
import { useUpcomingMovie } from '../../../../hooks/useUpcomingMovie';
import { CarouselCustom } from "../../../../common/CarouselCustom/CarouselCustom";

const UpcomingMovies = () => {
    const { data, isLoading, error, isError } = useUpcomingMovie();
 
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (isError) {
      return <Alert variant="danger">{error.message}</Alert>;
    }
  
    return (
      <div>
        <h3>Upcoming Movies</h3>
        <CarouselCustom data={data} />
      </div>
    );
  };

export default UpcomingMovies


