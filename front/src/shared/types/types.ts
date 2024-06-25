import { MouseEventHandler } from "react";

import { Film, FilmGenre } from "@/api";
import { FilmOnCart } from "@/entities/cart";

export type IconPropsType = {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};

export type Review = {
  rating: number;
  text: string;
  name: string;
  authorImage?: string;
};

export type FilmData = {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  director: string;
  genre: FilmGenre;
  rating: number;
  description: string;
};

export type FilmInfoPropsType = {
  className?: string;
  film: FilmData | FilmOnCart | Film;
  enableRemove?: boolean;
};
