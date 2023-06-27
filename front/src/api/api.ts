export type Genre = 'fantasy' | 'horror' |  'action' | 'comedy';

export type Film = {
  id: string,
  title: string,
  posterUrl: string,
  releaseYear: number,
  description: string,
  genre: Genre,
  rating: number,
  director: string,
  reviewIds: string[],
};

export async function fetchCinemas() {
  const response = await fetch('http://localhost:3001/api/cinemas');
  return await response.json();
}

export async function fetchMovies() {
  const response = await fetch('http://localhost:3001/api/movies');
  return await response.json();
}

export async function fetchReview(filmId: string) {
  const response = await fetch(`http://localhost:3001/api/reviews?movieId=${filmId}`);
  return await response.json();
}