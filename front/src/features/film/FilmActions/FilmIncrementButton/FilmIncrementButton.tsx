import React, { MouseEvent } from "react";
import cn from "classnames";

import Button from "@/shared/ui/Button";
import PlusIcon from "@/shared/ui/icons/plus";

import { Film } from "@/api";
import {
  useAddFilmToCart,
  useCartIsFull,
} from "@/entities/cart/selector";

import styles from "@/features/film/FilmActions/stylesFilmAction.module.css";

type FilmIncrementButtonPropsType = {
  film: Film;
  children?: React.ReactNode;
};

const FilmIncrementButton: React.FC<FilmIncrementButtonPropsType> = ({
  film,
  children,
}) => {
  const isFull = useCartIsFull();
  const addToCart = useAddFilmToCart();

  const onAddFilm = (event: MouseEvent<HTMLButtonElement>) => {
    if (isFull) {
      return;
    }
    event.stopPropagation();
    addToCart(film);
  };

  return (
    <Button
      className={cn(styles.filmButton, {
        [styles.filmButtonDisabled]: isFull,
      })}
      onClick={onAddFilm}
    >
      <PlusIcon />
      {children && children}
    </Button>
  );
};

export default FilmIncrementButton;
