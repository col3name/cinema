'use client';
import React, {MouseEvent} from 'react';

import FilmCounter from './FilmCounter';
import FilmIncrementButton from './FilmIncrementButton';
import FilmDecrementButton from './FilmDecrementButton';
import CloseIcon from '@/components/Common/icons/close';

import styles from './stylesFilmAction.module.css';

import {Film} from '@/api';
import {useRemoveFromCart} from '@/redux/features/cart/hooks';

export type FilmActionPropsType = {
  film: Film,
  enableRemove?: boolean,
};

const FilmActions: React.FC<FilmActionPropsType> = ({
  film,
  enableRemove = false,
}) => {
  const removeFromCart = useRemoveFromCart();
  const onRemoveFromOrder = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    removeFromCart(film.id)
  };
  return (
    <div className={ styles.filmActions }>
      <FilmDecrementButton filmId={ film.id } />
      <FilmCounter key={ film.id } filmId={ film.id } />
      <FilmIncrementButton film={ film }/>
      { enableRemove && <CloseIcon className={ styles.filmRemoveButton } onClick={ onRemoveFromOrder } />}
    </div>
  );
};

const MemoFilmAction = React.memo(FilmActions);
export default MemoFilmAction;
