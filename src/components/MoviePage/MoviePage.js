import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../../api/movies";

import MovieCard from "../MovieCard/MovieCard";

import styles from "./MoviePage.module.css";

const imagePrefixUrl = "http://image.tmdb.org/t/p/w500";
function MoviePage() {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  const fetchMovieDetails = () => {
    getMovieDetails(movieId).then((res) => {
      if (!res) return;
      setMovie(res);
    });
  };

  const fetchSimilarMovies = () => {
    getSimilarMovies(movieId).then((res) => {
      if (!res) return;
      setSimilarMovies(res.results);
    });
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src={`${imagePrefixUrl}${movie?.backdrop_path}`} />
        <div className={styles.details}>
          <label>Title</label>
          <div className={styles.title}>{movie?.title}</div>
          <div className={styles.sub}>{movie?.tagline}</div>
          <label>Story</label>
          <div className={styles.desc}>{movie?.overview}</div>
          <label>Run time</label>
          <div className={styles.desc}>{movie?.runtime} mins</div>
        </div>
      </div>
      <div className={styles.similar}>
        <div className={styles.title}>Similar movies</div>
        <div className={styles.movies}>
          {similarMovies.map((item) => (
            <MovieCard movie={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
