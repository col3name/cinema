"use client";
import React from "react";

import FilmCounter from "./FilmCounter";
import FilmIncrementButton from "./FilmIncrementButton";
import FilmDecrementButton from "./FilmDecrementButton";
import {Skeleton} from "@/shared/ui/Skeleton";
import {FilmRemoveButton} from "@/features/film/FilmActions/FilmRemoveButton";

import styles from "./stylesFilmAction.module.css";

import {Film} from "@/api";

export type FilmActionPropsType = {
  film: Film;
  enableRemove?: boolean;
};

export const FilmActionsSkeleton = () => {
  return (
      <Skeleton width={128} height={20}/>
  );
};

const FilmActions: React.FC<FilmActionPropsType> = ({
  film,
  enableRemove = false,
}) => {
  return (
    <div className={styles.filmActions}>
      <FilmDecrementButton filmId={film?.id} />
      <FilmCounter key={film?.id} filmId={film?.id} />
      <FilmIncrementButton film={film} />
      {enableRemove && (
        <FilmRemoveButton filmId={film.id} />
      )}
    </div>
  );
};

const MemoFilmAction = React.memo(FilmActions);
export default MemoFilmAction;
