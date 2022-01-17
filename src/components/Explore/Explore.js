import React, { useEffect, useState } from "react";

import { getGenre, getMoviesWithGenreId } from "../../api/movies";
import MovieCard from "../MovieCard/MovieCard";
import Paginate from "../Paginate/Paginate";

import styles from "./Explore.module.css";

function Explore() {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      setSelectedGenres([res.genres[0]]);
    });
  };

  const fetchMovies = (page) => {
    if (selectedGenres.length === 0) return;
    const ids = selectedGenres.map((item) => item.id).join(",");

    setIsMoreMoviesLoading(true);
    getMoviesWithGenreId(ids, page).then((res) => {
      setIsMoreMoviesLoading(false);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res.total_pages);
        setMovies(res.results);
      } else {
        setMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handleGenreClick = (genre) => {
    const tempGenres = [...selectedGenres];
    const currIndex = tempGenres.findIndex((item) => item.id === genre.id);

    if (currIndex < 0) {
      tempGenres.push(genre);
    } else {
      if (selectedGenres.length > 1) tempGenres.splice(currIndex, 1);
    }

    setSelectedGenres(tempGenres);
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchMovies(currentPage + 1);
  };

  useEffect(() => {
    if (isNearEnd) handlePaginate();
  }, [isNearEnd]);

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1);
  }, [selectedGenres]);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {allGenres.map((item) => (
          <div
            key={item.id + item.name}
            className={`${styles.chip} ${
              selectedGenres.find((elem) => elem.id === item.id)
                ? styles.activeChip
                : ""
            }`}
            onClick={() => handleGenreClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <p className={styles.title}>Explore Movies</p>
      <Paginate onIntersection={(isNearEnd) => setIsNearEnd(isNearEnd)}>
        <div className={styles.body}>
          {movies.map((item, index) => (
            <MovieCard movie={item} key={item.id + index + ""} />
          ))}
          {isMoreMoviesLoading && <b>Loading...</b>}
        </div>
      </Paginate>
    </div>
  );
}

export default Explore;
