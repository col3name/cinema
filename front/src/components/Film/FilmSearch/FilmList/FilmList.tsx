"use client";

import React, { useCallback } from "react";
import cn from "classnames";

import FilmInfo from "@/components/Film/FilmSearch/FilmInfo";
import DataHOC from "@/components/Common/DataHOC/DataHOC";

import styles from "./stylesFilmList.module.css";

import { Film } from "@/api";
import {
  useCinemasSelector,
  useFetchCinemas,
  useFetchMovies,
  useFilmsSelector,
} from "@/redux/features/film/hooks";
import { useFilmFilter } from "@/redux/features/filmFilter/selector";

export type FilmListPropsType = {
  className?: string;
};

const FilmList: React.FC<FilmListPropsType> = ({ className }) => {
  const { isLoading, error } = useFetchMovies();
  const cinemas = useCinemasSelector();
  const filter = useFilmFilter();

  const filterFilms = useCallback(
    (film: Film) =>
      (filter.name !== ""
        ? film.title.toLowerCase().includes(filter.name?.toLowerCase())
        : true) &&
      (filter.cinema !== ""
        ? cinemas
            ?.find((cinema) => cinema.id === filter.cinema)
            ?.movieIds?.includes(film.id)
        : true) &&
      (filter.genre !== ""
        ? film.genre.toLowerCase().includes(filter.genre?.toLowerCase())
        : true),
    [filter, cinemas],
  );

  const films = useFilmsSelector();
  const filmsList = films.filter(filterFilms);

  return (
    <DataHOC
      data={filmsList}
      isLoading={isLoading}
      loaderText="movies"
      error={error}
    >
      <ul className={cn(styles.filmList, className)}>
        {filmsList.map((film) => (
          <FilmInfo key={film.id} film={film} />
        ))}
      </ul>
    </DataHOC>
  );
};

const MemoizedFilmList = React.memo(FilmList);
export default MemoizedFilmList;
