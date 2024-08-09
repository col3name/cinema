"use client";

import React, {useCallback,} from "react";
import cn from "classnames";

import FilmInfo from "@/widgets/Film/FilmSearch/FilmInfo";
import {FilmInfoSkeleton} from "@/widgets/Film/FilmSearch/FilmInfo/FilmInfo";
import Button from "@/shared/ui/Button";

import styles from "./stylesFilmList.module.css";

import {Film} from "@/api";
import {useCinemasSelector, useFetchCinemas, useFetchMovies, useFilmsSelector,} from "@/entities/film";
import {useFilmFilterSelector} from "@/entities/filmFilter";
import {MAX_AUTO_SCROLL, useLoadOnScrollEnd} from "@/shared/hooks";
import FilmActions from "@/features/film/FilmActions/FilmActions";
import {fi} from "@faker-js/faker";

export type FilmListPropsType = {
  className?: string;
};

const FilmListSkeleton = () => {
    return (
        <ol className={cn(styles.filmListContainerSkeleton)}>
            <FilmInfoSkeleton/>
            <FilmInfoSkeleton/>
            <FilmInfoSkeleton/>
            <FilmInfoSkeleton/>
        </ol>
    );
};

const FilmList: React.FC<FilmListPropsType> = ({ className }) => {
  const { page, setPage, } = useLoadOnScrollEnd()
  const { movies, isLoading } = useFetchMovies(page);
  // const isLoading = true;
  const cinemas = useCinemasSelector();
  const filter = useFilmFilterSelector();

  const filterFilms = useCallback(
    (film: Film) =>
      (filter.name !== ""
        ? film.title.toLowerCase().includes(filter.name?.toLowerCase())
        : true) &&
      (filter.cinema !== ""
        ? cinemas
            ?.find((cinema) => cinema.id === filter.cinema)
            ?.movieIds?.includes(film?.id)
        : true) &&
      (filter.genre !== ""
        ? film.genre.toLowerCase().includes(filter.genre?.toLowerCase())
        : true),
    [filter, cinemas],
  );

  const filmsList: Film[]|undefined = movies?.filter(filterFilms);

  return (
    <div className={cn(styles.filmList, className)}>
      <ol className={styles.filmListContainer}>
        {filmsList?.map((film: Film) => (
            <FilmInfo key={film?.id} film={film}>
                <FilmActions film={film as Film} enableRemove={false} />
            </FilmInfo>
        ))}
      </ol>
      {isLoading && <FilmListSkeleton/>}
      {(!isLoading && page >= MAX_AUTO_SCROLL) && (
        <Button onClick={() => setPage((prev) => prev + 1)}>Загрузить еще</Button>
      )}
    </div>
  );
};

const MemoizedFilmList = React.memo(FilmList);
export default MemoizedFilmList;
