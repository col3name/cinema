export type Question = {
  title: string,
  answer: string,
};

export type IconPropsType = {
  className?: string,
  onClick?: (e) => void,
};

export type Review = {
  rating: number,
  text: string,
  name: string,
  authorImage?: string,
};

export type FilmData = {
  id: string,
  posterUrl: string,
  title: string,
  releaseYear: number,
  director: string,
  genre: string,
  rating: number,
  description: string,
};

export type FilmInfoPropsType = {
  className?: FilmData,
  film: FilmData,
  countOnCart?: number,
  addFilmToCart: (filmId: string) => void,
  removeFilmFromCart: (filmId: string) => void,
  removeFilmFromOrder?: (filmId: string) => void,
}