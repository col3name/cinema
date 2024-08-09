export const cinemasKey = 'api/cinemas';

export const getMoviesKey = (page: number = 0): string =>  `/api/movies?page=${page}`;

export const getMovieKey = (movieId: string): string => `/api/movie?movieId=${movieId}`;
