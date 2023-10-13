'use client';
import React, {MouseEvent} from 'react';

import Button from '@/components/Common/Button';
import FilmCounter from '@/components/Film/FilmActions/FilmCounter';
import MinusIcon from '@/components/Common/icons/minus';
import CloseIcon from '@/components/Common/icons/close';
import FilmAddButton from '@/components/Film/FilmActions/FilmAddButton';

import styles from './stylesFilmAction.module.css';

import {Film} from '@/api/api';
import {decrementQuantity, removeFromCart} from '@/redux/features/cartSlice';
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
  const onDecrementQuantity = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    dispatch(decrementQuantity(film.id));
  };
  const onRemoveFromOrder = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    dispatch(removeFromCart(film.id));
  };
  return (
    <div className={ styles.filmActions }>
      <Button className={ styles.filmRemoveButton } onClick={ onDecrementQuantity }>
        <MinusIcon />
      </Button>
      <FilmCounter key={ film.id } filmId={ film.id } />
      <FilmAddButton film={ film }/>
      { needRemove && <CloseIcon className={ styles.removeButton } onClick={ onRemoveFromOrder } />}
    </div>
  );
};

const MemoFilmAction = React.memo(FilmActions);
export default MemoFilmAction;
