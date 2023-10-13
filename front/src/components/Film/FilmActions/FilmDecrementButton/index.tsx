import React, {MouseEvent} from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import MinusIcon from '@/components/Common/icons/minus';

import styles from '@/components/Film/FilmActions/stylesFilmAction.module.css';

import { useFilmInCart} from '@/redux/features/cart/selector';
import {useDecrementFilmInCart} from '@/redux/features/cart/hooks';

type FilmRemoveButtonPropsType = {
  children?: React.ReactNode,
  filmId: string,
}

const FilmDecrementButton: React.FC<FilmRemoveButtonPropsType> = ({
  children,
  filmId,
}) => {
  const disabled = useFilmInCart(filmId)
  const decrementFilm = useDecrementFilmInCart();
  const onDecrementQuantity = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    decrementFilm(filmId)
  };
  return (
    <Button
      className={ cn(styles.filmButton, {
        [styles.filmButtonDisabled]: disabled
      }) }
      onClick={ onDecrementQuantity }
    >
      <MinusIcon />
      { children && children }
    </Button>
  )
}

export default FilmDecrementButton;
