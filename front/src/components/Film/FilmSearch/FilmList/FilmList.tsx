"use client";

import React, {
  useCallback,
  useState,
  useEffect,
} from "react";
import cn from "classnames";

import FilmInfo from "@/components/Film/FilmSearch/FilmInfo";
// import DataHOC from "@/components/Common/DataHOC/DataHOC";

import styles from "./stylesFilmList.module.css";

import { Film } from "@/api";
import {
  useCinemasSelector,
  useFetchMovies,
  useFetchCinemas,
  useFilmsSelector,
} from "@/redux/features/film/hooks";
import { useFilmFilter } from "@/redux/features/filmFilter/selector";
import throttle from "lodash/throttle";

export type FilmListPropsType = {
  className?: string;
};

const MAX_AUTO_SCROLL = 5;

const FilmList: React.FC<FilmListPropsType> = ({ className }) => {
  const [page, setPage] = useState<number>(0);

  const { isLoading } = useFetchMovies(page);
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
            ?.movieIds?.includes(film.id)
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
      {/*<div>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      if (page > 0) {*/}
      {/*        setPage((prev) => prev - 1);*/}
      {/*      }*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    prev*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      setPage((prev: number) => prev + 1);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    next*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/* <DataHOC
        data={filmsList}
        isLoading={isLoading}
        loaderText="movies"
        error={error}
      > */}
      <ul>
        {filmsList.map((film: Film) => (
          <FilmInfo key={film.id} film={film} />
        ))}
      </ul>
      {isLoading && <div>Loading...</div>}
      {!isLoading && page >= MAX_AUTO_SCROLL && (
        <button onClick={() => setPage((prev) => prev + 1)}>next page</button>
      )}
      {/* </DataHOC> */}
    </div>
  );
};

const MemoizedFilmList = React.memo(FilmList);
export default MemoizedFilmList;
