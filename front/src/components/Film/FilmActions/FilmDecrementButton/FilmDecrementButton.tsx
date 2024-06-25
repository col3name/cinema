import React, { MouseEvent } from "react";
import cn from "classnames";

import Button from "@/shared/ui/Button";
import MinusIcon from "@/shared/ui/icons/minus";

import styles from "@/components/Film/FilmActions/stylesFilmAction.module.css";

import {
  useFilmInCartNotExist,
  useDecrementFilmInCart,
} from "@/entities/cart";

type FilmRemoveButtonPropsType = {
  children?: React.ReactNode;
  filmId: string;
};

const FilmDecrementButton: React.FC<FilmRemoveButtonPropsType> = ({
  children,
  filmId,
}) => {
  const disabled = useFilmInCartNotExist(filmId);
  const decrementFilm = useDecrementFilmInCart();
  const onDecrementQuantity = (
    event: MouseEvent<HTMLButtonElement | SVGSVGElement>,
  ) => {
    event.stopPropagation();
    decrementFilm(filmId);
  };
  return (
    <Button
      className={cn(styles.filmButton, {
        [styles.filmButtonDisabled]: disabled,
      })}
      onClick={onDecrementQuantity}
    >
      <MinusIcon />
      {children && children}
    </Button>
  );
};

export default FilmDecrementButton;
