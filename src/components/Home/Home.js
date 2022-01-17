import React, { useEffect, useState } from "react";

import { getPopularMovies } from "../../api/movies";

import Paginate from "../Paginate/Paginate";
import MovieCard from "../MovieCard/MovieCard";

import styles from "./Home.module.css";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchPopularMovies = (page) => {
    setIsMoreMoviesLoading(true);
    getPopularMovies(page).then((res) => {
      setIsMoreMoviesLoading(false);
      setIsDataLoaded(true);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res.total_pages);
        setPopularMovies(res.results);
      } else {
        setPopularMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchPopularMovies(currentPage + 1);
  };

  useEffect(() => {
    if (isNearEnd) handlePaginate();
  }, [isNearEnd]);

  useEffect(() => {
    fetchPopularMovies(1);
  }, []);
  return (
    <div className={styles.container}>
      {!isDataLoaded ? (
        "Loading..."
      ) : (
        <Paginate onIntersection={(isOnEnd) => setIsNearEnd(isOnEnd)}>
          <div className={styles.title}>Popular movies</div>
          <div className={styles.innerContainer}>
            {popularMovies.map((item, index) => (
              <MovieCard movie={item} key={item.id + index + ""} />
            ))}
            {isMoreMoviesLoading && <b>Loading...</b>}
          </div>
        </Paginate>
      )}
    </div>
  );
}

export default Home;
