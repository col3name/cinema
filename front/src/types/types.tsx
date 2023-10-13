import {MouseEventHandler} from 'react';

import {Film, FilmGenre} from '@/api/api';
import {FilmOnCart} from '@/redux/features/cart/slice';

export type Question = {
  title: string,
  answer: string,
};

export type IconPropsType = {
  className?: string,
  onClick?: MouseEventHandler<SVGSVGElement> | undefined,
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
  genre: FilmGenre,
  rating: number,
  description: string,
};

export type FilmInfoPropsType = {
  className?: string,
  film: FilmData | FilmOnCart | Film,
  countOnCart?: number,
}