import { movies } from '../data/movies';

export const MovieService = {
  getAllMovies: () => {
    return movies;
  },
  
  getMovieById: (id) => {
    return movies.find(movie => movie.id === id);
  },

  getMoviesByGenre: (genre) => {
    return movies.filter(movie => movie.genre === genre);
  },

  getRecentMovies: (year = 2010) => {
    return movies.filter(movie => movie.year > year);
  }
};
