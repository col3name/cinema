'use client';

import React from 'react';
import cn from 'classnames';

import FilmInfo from '@/components/Film/FilmSearch/FilmInfo';

import styles from './stylesFilmList.module.css';

import {Film} from '@/api/api';
import {useCinemasSelector, useFilmsSelector} from "@/redux/features/film/hooks";
import {useFilmFilter} from "@/redux/features/filmFilter/selector";

export type FilmListPropsType = {
  className?: string
};

const FilmList: React.FC<FilmListPropsType> = ({
  className,
}) => {
  const films = useFilmsSelector()
  const cinemas = useCinemasSelector();
  const filter = useFilmFilter()

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
