import React, {MouseEvent} from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import PlusIcon from '@/components/Common/icons/plus';

import styles from '@/components/Film/FilmActions/stylesFilmAction.module.css';

import {Film} from '@/api/api';
import {useAddFilmToCart, useCartIsFull} from '@/redux/features/cart/selector';

type FilmIncrementButtonPropsType = {
  film: Film,
  children?: React.ReactNode,
}

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
    addToCart(film)
  };
  return (
    <Button
      className={ cn(styles.filmButton, {
        [styles.filmButtonDisabled]: isFull
      }) }
      onClick={ onAddFilm }
    >
      <PlusIcon />
      {children && children}
    </Button>
  )
}

export default FilmIncrementButton;