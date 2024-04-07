import { Review } from "@/shared/types";
import { Cinema } from "@/redux/features/film/model";

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

export async function fetchCinemas(): Promise<Cinema[]> {
  const response = await fetch("/api/cinemas");
  return await response.json();
}

export const fetchMovies = (page: number) => async (): Promise<Film[]> => {
  const response = await fetch(`/api/movies?page=${page}`);
  return await response.json();
};

export const fetchMovie =
  (filmId: string) => async (): Promise<Film | undefined> => {
    const response = await fetch(`/api/movie?movieId=${filmId}`);
    return await response.json();
  };

export const fetchReview = (filmId: string) => async (): Promise<Review[]> => {
  const response = await fetch(`/api/reviews?movieId=${filmId}`);
  return await response.json();
};
