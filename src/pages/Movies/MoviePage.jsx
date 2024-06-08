import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Dropdown, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

//경로 2가지
//nav바에서 클릭해서 온 경우 => popularMovie 보여주기
//keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
//page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [query] = useSearchParams();
  const [sortOrder, setSortOrder] = useState(null); //인기순 정렬
  const [filterGenre, setFilterGenre] = useState(null); //장르별 정렬
  const keyword = query.get("q");
  const { data, isLoading, error, isError } = useSearchMovieQuery({
    keyword,
    page,
  });
  const { data: genres } = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const sortedMovies = useMemo(() => {
    if (!data?.results) return [];
    let sortedResults = [...data.results];
    if (sortOrder === "Desc") {
      sortedResults.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOrder === "Asc") {
      sortedResults.sort((a, b) => a.popularity - b.popularity);
    } else if (sortOrder === "Genre") {
      sortedResults = sortedResults
        ?.map((movie) => {
          if (
            movie.genre_ids.find((genreId) => filterGenre === genreId) !==
            undefined
          ) {
            return movie;
          }
          return "";
        })
        .filter((item) => {
          return item !== null && item !== undefined && item !== "";
        });
    }
    return sortedResults;
  }, [data?.results, sortOrder, filterGenre]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Row>
            <Col>
              <h2>Sort by</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  Popularity
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortOrder("Desc")}>
                    Desc
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder("Asc")}>
                    Asc
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {genres.map((item, idx) => (
                    <Dropdown.Item
                      key={idx}
                      onClick={() => {
                        setFilterGenre(item.id);
                        setSortOrder("Genre");
                      }}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>

        <Col lg={8} xs={12}>
          <Row>
            {sortedMovies?.map((movie, idx) => (
              <Col key={idx} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
            <Col>
              <h2>{sortedMovies.length === 0 && `There's no sort results`}</h2>{" "}
            </Col>
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} //전체페이지
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
