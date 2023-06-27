'use client';

import React from "react";
import cn from 'classnames';

import FilmInfo from '@/components/Film/FilmSearch/FilmInfo';

import styles from './stylesFilmList.module.css';
import {useSelector} from "react-redux";

export type FilmListPropsType = {
  className?: string
};

const FilmList: React.FC<FilmListPropsType> = ({
  className,
}) => {

  const list = useSelector(state => state.films.films);
  const cinemas = useSelector(state => state.films.cinemas);
  const filter = useSelector(state => state.filter);
  return <div className={ cn(styles.filmList, className) }>
    { list.filter(it =>
      filter.name !== '' ? it.title.toLowerCase().includes(filter.name?.toLowerCase()) : true
      && filter.cinema != '' ? cinemas.find(it => it.id === filter.cinema).movieIds.includes(it.id) : true
      && filter.genre !== '' ? it.genre.toLowerCase().includes(filter.genre?.toLowerCase()) : true
    ).map(film => <FilmInfo
      key={ film.id }
      film={ film }
    /> ) }
  </div>
}

export default FilmList;
