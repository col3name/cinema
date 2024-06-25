"use client";
import React, { MouseEvent } from "react";

import FilmCounter from "./FilmCounter";
import FilmIncrementButton from "./FilmIncrementButton";
import FilmDecrementButton from "./FilmDecrementButton";
import CloseIcon from "@/shared/ui/icons/close";
import {Skeleton} from "@/shared/ui/Skeleton";

import styles from "./stylesFilmAction.module.css";

import { Film } from "@/api";
import { useRemoveFromCart } from "@/entities/cart";

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
  const removeFromCart = useRemoveFromCart();
  const onRemoveFromOrder = (
    event: MouseEvent<HTMLButtonElement | SVGSVGElement>,
  ) => {
    event.stopPropagation();
    removeFromCart(film.id);
  };
  return (
    <div className={styles.filmActions}>
      <FilmDecrementButton filmId={film?.id} />
      <FilmCounter key={film?.id} filmId={film?.id} />
      <FilmIncrementButton film={film} />
      {enableRemove && (
        <CloseIcon
          className={styles.filmRemoveButton}
          onClick={onRemoveFromOrder}
        />
      )}
    </div>
  );
};

const MemoFilmAction = React.memo(FilmActions);
export default MemoFilmAction;
