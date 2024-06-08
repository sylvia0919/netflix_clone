import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "./CarouselCustom.style.css";
import 'react-multi-carousel';
import { responsive } from "../../constancts/responsive";

export const CarouselCustom = ({ data }) => {

  return (
    <Carousel
      infinite={true}
      itemClass="carousel-item-padding-40-px"
      centerMode={true}
      containerClass="carousel-container"
      responsive={responsive}
    >
      {data?.results.map((movie, idx) => (
        <MovieCard movie={movie} key={idx} />
      ))}
    </Carousel>
  );
};
