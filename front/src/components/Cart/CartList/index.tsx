'use client';
import React from 'react';
import cn from 'classnames';

import FilmInfo from '@/components/Film/FilmSearch/FilmInfo';

import styles from './stylesCartList.module.css'

import {FilmOnCart} from '@/redux/features/cartSlice';

export type CartListPropsType = {
  className?: string,
  films: FilmOnCart[],
}

const CartList: React.FC<CartListPropsType> = ({
  className,
  films,
}) => {
  return <div className={ cn(styles.cartContainer, className) }>
    { films.map((film: FilmOnCart) => (
      <FilmInfo
        key={ film.id }
        film={ film }
      />
    )) }
  </div>
};

export default CartList;
