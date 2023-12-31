import {Review} from '@/shared/types/types';
import {Cinema} from '@/redux/features/film/model';

export type FilmGenre = 'fantasy' | 'horror' | 'action' | 'comedy' | '';

export type Film = {
  id: string,
  title: string,
  posterUrl: string,
  releaseYear: number,
  description: string,
  genre: FilmGenre,
  rating: number,
  director: string,
  reviewIds: string[],
};

export async function fetchCinemas(): Promise<Cinema[]> {
  const response = await fetch('/api/cinemas');
  return await response.json();
}

export async function fetchMovies(): Promise<Film[]> {
  const response = await fetch('/api/movies');
  return await response.json();
}

export async function fetchMovie(filmId: string): Promise<Film|undefined> {
  const response = await fetch(`/api/movie?movieId=${filmId}`);
  return await response.json();
}

export async function fetchReview(filmId: string): Promise<Review[]> {
  const response = await fetch(`/api/reviews?movieId=${filmId}`);
  return await response.json();
}