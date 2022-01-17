const apiKey = "805e727d73db14f985bc6bf85b893ee8";
const apiDomain = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${apiDomain}/movie/popular?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getGenre = async () => {
  try {
    const res = await fetch(`${apiDomain}/genre/movie/list?api_key=${apiKey}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMovieImages = async (id) => {
  try {
    const res = await fetch(
      `${apiDomain}/movie/${id}/images?api_key=${apiKey}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${apiDomain}/movie/${id}?api_key=${apiKey}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const res = await fetch(
      `${apiDomain}/movie/${id}/similar?api_key=${apiKey}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMoviesWithGenreId = async (id, page = 1) => {
  try {
    const res = await fetch(
      `${apiDomain}/discover/movie?api_key=${apiKey}&with_genres=${id}&sort_by=popularity.desc&page=${page}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const searchMovie = async (query) => {
  try {
    const res = await fetch(
      `${apiDomain}/search/movie?api_key=${apiKey}&query=${query}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
