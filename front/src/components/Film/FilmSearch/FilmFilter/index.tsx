'use client';
import React, {useEffect} from 'react';
import cn from 'classnames';

import FilterTitle from '@/components/Film/FilmSearch/FilmFilter/FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';

import styles from './stylesFilmFilter.module.css';

import {getUrlParameter, replaceUrlParam} from '@/shared/lib/url';
import {useCinemasSelector, useFilmsSelector} from '@/redux/features/film/hooks';
import {Cinema} from '@/redux/features/film/model';
import {useFilmFilter} from '@/redux/features/filmFilter/hooks';

export type FilmFilterPropsType = {
  className?: string,
};

const DEFAULT_VALUE = 'Все';

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
}) => {
  const films = useFilmsSelector()
  const cinemas = useCinemasSelector();
  const genres = Array.from(new Set(films.map(film => film.genre)).values());

  const {
    updateCinemaFilter,
    updateGenreFilter,
    updateFilmFilter,
  } = useFilmFilter()
  useEffect(() => {
    const filmName = getUrlParameter('name');
    const genre = getUrlParameter('genre');
    const cinema = getUrlParameter('cinema');
    updateCinemaFilter(cinema);
    updateFilmFilter(filmName);
    updateGenreFilter(genre);
  }, [updateCinemaFilter, updateFilmFilter, updateGenreFilter]);

  const onChangeFilmName = (filmName: string) => {
    updateFilmFilter(filmName)
    replaceUrlParam('name', filmName);
  };

  const onSelectFilmGenre = e => {
    const value = e.target.value;
    const newGenre = value === DEFAULT_VALUE ? '' : value;
    updateGenreFilter(newGenre)
    replaceUrlParam('genre', newGenre);
  };

  const onSelectCinema = (e) => {
    const cinema = cinemas.find((it: Cinema) => it.id === e.target.value);
    if (!cinema) {
      return;
    }
    const {id} = cinema;
    updateCinemaFilter(id)
    replaceUrlParam('cinema', id);
  };

  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска"/>
      <Label title="Название">
        <Input placeholder="Введите название" onChange={ onChangeFilmName }/>
      </Label>
      <Label title="Жанр">
        <select placeholder="Выберите жанр" onChange={ onSelectFilmGenre }>
          {[undefined, ...genres].map((genre: string|undefined, id: number) => <option key={id} id={genre} value={genre}>{genre || 'Все'}</option>)}
        </select>
      </Label>
      <Label title="Кинотеатр">
        <select placeholder="Выберите кинотеатр" onChange={ onSelectCinema }>
          {cinemas.map((cinema: Cinema) => <option key={cinema.id} value={cinema.id}>{cinema.name}</option>)}
        </select>
      </Label>
    </div>
  );
};

export default FilmFilter;
