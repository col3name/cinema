'use client';
import React, {MouseEvent} from 'react';

import FilmCounter from '@/components/Film/FilmActions/FilmCounter';
import CloseIcon from '@/components/Common/icons/close';
import FilmIncrementButton from '@/components/Film/FilmActions/FilmIncrementButton';
import FilmDecrementButton from '@/components/Film/FilmActions/FilmDecrementButton';

import styles from './stylesFilmAction.module.css';

import {Film} from '@/api/api';
import { removeFromCart} from '@/redux/features/cart/slice';
import {useAppDispatch} from '@/redux/hooks';

export type FilmActionPropsType = {
  film: Film,
  needRemove?: boolean,
};


const FilmActions: React.FC<FilmActionPropsType> = ({
  film,
  needRemove = false,
}) => {
  const dispatch = useAppDispatch();

  const onRemoveFromOrder = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    dispatch(removeFromCart(film.id));
  };
  return (
    <div className={ styles.filmActions }>
      <FilmDecrementButton filmId={ film.id } />
      <FilmCounter key={ film.id } filmId={ film.id } />
      <FilmIncrementButton film={ film }/>
      { needRemove && <CloseIcon className={ styles.filmRemoveButton } onClick={ onRemoveFromOrder } />}
    </div>
  );
};

const MemoFilmAction = React.memo(FilmActions);
export default MemoFilmAction;
