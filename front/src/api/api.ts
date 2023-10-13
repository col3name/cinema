import {Review} from '@/types/types';
import {Cinema} from "@/redux/features/film/model";

export type FilmGenre = 'fantasy' | 'horror' |  'action' | 'comedy';

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
  const response = await fetch('http://localhost:3001/api/cinemas');
  return await response.json();
}

export async function fetchMovies(): Promise<Film[]> {
  const response = await fetch('http://localhost:3001/api/movies');
  let data = await response.json();
  console.log(data)
  return data;
}

export async function fetchReview(filmId: string): Promise<Review[]> {
  const response = await fetch(`http://localhost:3001/api/reviews?movieId=${filmId}`);
  return await response.json();
}