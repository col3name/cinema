'use client';
import React from 'react';

import Button from '@/components/Common/Button';
import MinusIcon from '@/components/Common/icons/minus';
import PlusIcon from '@/components/Common/icons/plus';

import styles from './stylesFilmAction.module.css';
import CloseIcon from "@/components/Common/icons/close";

export type FilmActionPropsType = {
  filmId: string,
  countOnCart: number,
  addFilmToCart: (filmId: string) => void,
  removeFilmFromCart: (filmId: string) => void,
  removeFilmFromOrder?: (filmId: string) => void,
};

const FilmActions: React.FC<FilmActionPropsType> = ({
  filmId,
  countOnCart,
  addFilmToCart,
  removeFilmFromCart,
  removeFilmFromOrder,
}) => {
  const onRemoveFilm = (e) => {
    e.stopPropagation();
    removeFilmFromCart(filmId);
  };

  const onAddFilm = (e) => {
    e.stopPropagation();
    addFilmToCart(filmId);
  };
  const onRemoveFromOrder = (e) => {
    e.stopPropagation();
    if (removeFilmFromOrder) {
      removeFilmFromOrder(filmId);
    }
  };

  return <div className={ styles.filmActions }>
    <Button className={ styles.filmRemoveButton } onClick={ onRemoveFilm }>
      <MinusIcon />
    </Button>
    <p>{ countOnCart } </p>
    <Button className={ styles.filmAddButton } onClick={ onAddFilm }>
      <PlusIcon />
    </Button>
    { removeFilmFromOrder && <CloseIcon className={ styles.removeButton } onClick={ onRemoveFromOrder } /> }
  </div>
};

export default FilmActions;
