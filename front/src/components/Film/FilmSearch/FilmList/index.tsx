import React from "react";
import cn from 'classnames';

import FilmInfo from '@/components/Film/FilmSearch/FilmInfo';

import { FilmData } from '@/types/types';

import styles from './stylesFilmList.module.css';

export type FilmListPropsType = {
  className?: string
  films: FilmData[],
  addFilmToCart: (filmId: string) => void,
  removeFilmFromCart: (filmId: string) => void,
  removeFilmFromOrder?: (filmId: string) => void,
};

const FilmList: React.FC<FilmListPropsType> = ({
  className,
  films = [],
  addFilmToCart,
  removeFilmFromCart,
  removeFilmFromOrder,
}) => {
  return <div className={ cn(styles.filmList, className) }>
    { films.map(film => <FilmInfo
      key={ film.id }
      film={ film }
      addFilmToCart={ addFilmToCart }
      removeFilmFromCart={ removeFilmFromCart }
      removeFilmFromOrder={ removeFilmFromOrder }
    /> ) }
  </div>
}

export default FilmList;
