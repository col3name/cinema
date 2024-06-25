import {MouseEventHandler} from "react";

import {FilmGenre} from "@/api";

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

