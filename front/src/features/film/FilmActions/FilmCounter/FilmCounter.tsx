import React from "react";

import { useCartFilm } from "@/entities/cart";

export type FilmCounterPropsType = {
  filmId: string;
  className?: string;
};

const FilmCounter: React.FC<FilmCounterPropsType> = ({
  filmId,
  className = "",
}) => {
  const filmOnCart = useCartFilm(filmId);
  return (
    <p className={className}>{(filmOnCart && filmOnCart?.quantity) || 0} </p>
  );
};

export default FilmCounter;
