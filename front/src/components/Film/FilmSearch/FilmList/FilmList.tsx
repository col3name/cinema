"use client";

import React, {
  useCallback,
  useState,
  useEffect,
} from "react";
import cn from "classnames";
import throttle from "lodash/throttle";

import FilmInfo from "@/components/Film/FilmSearch/FilmInfo";
// import DataHOC from "@/shared/ui/DataHOC/DataHOC";
import {FilmInfoSkeleton} from "@/components/Film/FilmSearch/FilmInfo/FilmInfo";
import Button from "@/shared/ui/Button";

import styles from "./stylesFilmList.module.css";

import { Film } from "@/api";
import {
  useCinemasSelector,
  useFetchMovies,
  useFetchCinemas,
  useFilmsSelector,
} from "@/entities/film";
import { useFilmFilter } from "@/entities/filmFilter";

export type FilmListPropsType = {
  className?: string;
};

const MAX_AUTO_SCROLL = 5;

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
  const [page, setPage] = useState<number>(0);

  const { isLoading } = useFetchMovies(page);
  // const isLoading = true;
  useFetchCinemas();
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
            ?.movieIds?.includes(film?.id)
        : true) &&
      (filter.genre !== ""
        ? film.genre.toLowerCase().includes(filter.genre?.toLowerCase())
        : true),
    [filter, cinemas],
  );

  const films = useFilmsSelector();
  const filmsList = films.filter(filterFilms);

  const handleScroll = throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
      if (page >= MAX_AUTO_SCROLL) {
          return;
      }
      if (scrollTop + clientHeight >= scrollHeight - 20) {
          setPage((prev) => prev + 1);
      }
  }, 300);

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [page, handleScroll]);

  return (
    <div className={cn(styles.filmList, className)}>

      {/* <DataHOC
        data={filmsList}
        isLoading={isLoading}
        loaderText="movies"
        error={error}
      > */}
      <ol className={styles.filmListContainer}>
        {filmsList?.map((film: Film) => (
          <FilmInfo key={film?.id} film={film} />
        ))}
      </ol>
      {isLoading && <FilmListSkeleton/>}
      {!isLoading && page >= MAX_AUTO_SCROLL && (
        <Button onClick={() => setPage((prev) => prev + 1)}>Загрузить еще</Button>
      )}
      {/* </DataHOC> */}
    </div>
  );
};

const MemoizedFilmList = React.memo(FilmList);
export default MemoizedFilmList;
