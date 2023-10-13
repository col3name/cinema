import React from 'react';

import {FilmOnCart} from '@/redux/features/cartSlice';
import {useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';

export type FilmCounterPropsType = {
  filmId: string,
  className?: string,
}

const FilmCounter: React.FC<FilmCounterPropsType> = ({
  filmId,
  className = ''
}) => {
  const filmOnCart = useAppSelector((state: RootState) =>
    state.cart.films.find((film: FilmOnCart) => film.id === filmId)
  );
  return <p className={className}>{ filmOnCart && filmOnCart?.quantity || 0 } </p>
}

export default FilmCounter;

