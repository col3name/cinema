'use client';

import React from 'react';
import cn from 'classnames';
import {useAppSelector} from '@/redux/hooks';

import FilmInfo from '@/components/Film/FilmSearch/FilmInfo';

import styles from './stylesFilmList.module.css';

import {RootState} from '@/redux/store';
import {Film} from '@/api/api';

export type FilmListPropsType = {
  className?: string
};

const FilmList: React.FC<FilmListPropsType> = ({
  className,
}) => {
  const films = useAppSelector((state: RootState) => state.films.films);
  const cinemas = useAppSelector((state: RootState) => state.films.cinemas);
  const filter = useAppSelector((state: RootState) => state.filter);

  const filterFilms = (film: Film) =>
    (filter.name !== '' ? film.title.toLowerCase().includes(filter.name?.toLowerCase()) : true)
    && (filter.cinema !== '' ? cinemas?.find(it => it.id === filter.cinema)?.movieIds?.includes(film.id) : true)
    && (filter.genre !== '' ? film.genre.toLowerCase().includes(filter.genre?.toLowerCase()) : true)
  const filmsList = films.filter(filterFilms);
  if (filmsList.length === 0) {
    return null
  }
  return <div className={ cn(styles.filmList, className) }>
    { filmsList.map(film => (
      <FilmInfo
        key={ film.id }
        film={ film }
      />
    ) ) }
  </div>
}

const MemoizedFilmList = React.memo(FilmList);
export default MemoizedFilmList;
