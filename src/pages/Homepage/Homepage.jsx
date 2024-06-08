import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopratedMovies from './components/TopratedMovies/TopratedMovies'
import UpcomingMovies from './components/UpcomingMovies/UpcomingMovies'

//1. 배너 => popular영화를 들고와서 첫번째 아이템을 보여주자
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
      <TopratedMovies/>
      <UpcomingMovies/>
    </div>
  )
}

export default Homepage