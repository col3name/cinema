import {Review} from "@/shared/types";
import {Cinema} from "@/entities/film";

export type FilmGenre = "fantasy" | "horror" | "action" | "comedy" | "";

export type Film = {
    id: string;
    title: string;
    posterUrl: string;
    releaseYear: number;
    description: string;
    genre: FilmGenre;
    rating: number;
    director: string;
    reviewIds: string[];
};
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "http://localhost:8080";

export const fetchCinemas = async (): Promise<Cinema[]> => {
    const response = await fetch(BASE_URL + "/api/cinemas");
    return await response.json();
}

export const fetchMoviesFn = async (page: number = 0): Promise<Film[]> => {
    const response: Response = await fetch(BASE_URL + `/api/movies?page=${page}`);
    return await response.json();
};

export const fetchMovies = (page: number = 0) => async (): Promise<Film[]> => {
    const response: Response = await fetch(BASE_URL + `/api/movies?page=${page}`);
    return await response.json();
};

export const fetchMovieById = (movieId: string) => async (): Promise<Film|undefined> => {
    const movies: Film[] = await fetchMoviesFn(0);
    const movie: Film | undefined = movies.find(movie => movie.id === movieId);

    return movie;
}

export const fetchMovie = (filmId: string) => async (): Promise<Film | undefined> => {
    const response: Response = await fetch(BASE_URL + `/api/movie?movieId=${filmId}`);
    return await response.json();
};

export const fetchReview = (filmId: string) =>  async (): Promise<Review[]> => {
    const response = await fetch(BASE_URL + `/api/reviews?movieId=${filmId}`);
    return await response.json();
};
