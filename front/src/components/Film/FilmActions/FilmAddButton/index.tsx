import React, {MouseEvent} from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import PlusIcon from '@/components/Common/icons/plus';

import styles from '@/components/Film/FilmActions/stylesFilmAction.module.css';

import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {addToCart} from '@/redux/features/cartSlice';
import {RootState} from '@/redux/store';
import {Film} from '@/api/api';

type FilmAddButtonPropsType = {
  film: Film,
}

const FilmAddButton: React.FC<FilmAddButtonPropsType> = ({
  film,
}) => {
  const dispatch = useAppDispatch();
  const onAddFilm = (event: MouseEvent<HTMLButtonElement>) => {
    if (isFull) {
      return;
    }
    event.stopPropagation();
    dispatch(addToCart(film));
  };
  const isFull = useAppSelector((state: RootState) => state.cart.isFull)
  return (
    <Button disabled={isFull} className={ cn(styles.filmAddButton, {
      [styles.filmAddButtonDisabled]: isFull
    }) } onClick={ onAddFilm }>
      <PlusIcon />
    </Button>
  )
}

export default FilmAddButton;