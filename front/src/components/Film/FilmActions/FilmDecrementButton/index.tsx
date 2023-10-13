import React, {MouseEvent} from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import MinusIcon from '@/components/Common/icons/minus';

import styles from '@/components/Film/FilmActions/stylesFilmAction.module.css';

import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';
import {decrementQuantity, FilmOnCart} from '@/redux/features/cartSlice';

type FilmRemoveButtonPropsType = {
  children?: React.ReactNode,
  filmId: string,
}

const FilmDecrementButton: React.FC<FilmRemoveButtonPropsType> = ({
  children,
  filmId,
}) => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector((state: RootState) => state.cart.films.find((film: FilmOnCart) => film.id === filmId) === undefined);

  const onDecrementQuantity = (event: MouseEvent<HTMLButtonElement|SVGSVGElement>) => {
    event.stopPropagation();
    dispatch(decrementQuantity(filmId));
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
