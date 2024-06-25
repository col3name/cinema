import React from "react";
import type { FC } from "react";

import FilmActions from "@/components/Film/FilmActions/FilmActions";

import { useFilmInCartNotExist } from "@/entities/cart";
import { Film } from "@/api";

export interface FilmActionsWrapperProps {
  film: Film;
}

const FilmActionsWrapper: FC<FilmActionsWrapperProps> = ({ film }) => {
  const inCart = useFilmInCartNotExist(film.id);
  return <FilmActions film={film} enableRemove={!inCart} />;
};

export default FilmActionsWrapper;
