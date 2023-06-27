'use client';
import React from 'react';

import styles from './stylesCartList.module.css'
import cn from "classnames";
import FilmInfo from "@/components/Film/FilmSearch/FilmInfo";

export type CartFilm = {
  id: string,
  cinema: string,
  name: string,
  posterFilm: string,
  ticketCount: string,
};

export type CartListPropsType = {
  className?: string,
  films: CartFilm[],
  addOneFilmToOrder: (filmId: string) => void,
  removeOneFilmFromOrder: (filmId: string) => void,
  removeFilmFromOrder: (filmId: string) => void,
}

const CartList: React.FC<CartListPropsType> = ({
  className,
  films,
  addOneFilmToOrder,
  removeOneFilmFromOrder,
  removeFilmFromOrder,x
}) => {
  // return <FilmList
  //   films={ films }
  //   addFilmToCart={ () => {} }
  //   removeFilmFromCart={ () => {} }
  //   removeFilmFromOrder={ () => {} }
  // />
  return <div className={ cn(styles.cartContainer, className) }>
    { films.map(film =>
      <FilmInfo
        key={ film.id }
        film={ film }
        addFilmToCart={ (filmId: string) => {} }
        removeFilmFromCart={(filmId: string) => {} }
        removeFilmFromOrder={ (filmId: string) => {} }
      />) }
  </div>
};

export default CartList;
