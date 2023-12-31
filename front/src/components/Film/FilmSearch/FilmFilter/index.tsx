'use client';
import React, {useEffect} from 'react';
import cn from 'classnames';

import FilterTitle from './FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Dropdown from '@/components/Common/Dropdown/Dropdown';

import styles from './stylesFilmFilter.module.css';

import {getUrlParameter, replaceUrlParam} from '@/shared/lib/url';
import {useCinemasSelector, useFilmsSelector} from '@/redux/features/film/hooks';
import {Cinema} from '@/redux/features/film/model';
import {useFilmFilter} from '@/redux/features/filmFilter/hooks';
import {FilmGenre} from '@/api/api';
import {GenreToText, TextToGenre} from '@/shared/lib/translator';

export type FilmFilterPropsType = {
  className?: string,
};

const DEFAULT_VALUE = 'Все';

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
}) => {
  const films = useFilmsSelector()
  const cinemas = useCinemasSelector();
  const genres: FilmGenre[] = Array.from(new Set(films.map(film => film.genre)).values());

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
    const genreValue = TextToGenre[genre];
    if (!genreValue) {
      replaceUrlParam('genre', '');
    }
    updateGenreFilter(genreValue || '');
  }, [updateCinemaFilter, updateFilmFilter, updateGenreFilter]);

  const onChangeFilmName = (filmName: string) => {
    updateFilmFilter(filmName)
    replaceUrlParam('name', filmName);
  };

  const onSelectFilmGenre = (value: string) => {
    const newGenre = !value || value === DEFAULT_VALUE ? '' : value;
    updateGenreFilter(TextToGenre[newGenre] || '')
    replaceUrlParam('genre', newGenre);
  };

  const onSelectCinema = (cinemaName: string) => {
    const cinema = cinemas.find((it: Cinema) => it.name === cinemaName);
    if (!cinema) {
      replaceUrlParam('cinema', '');
      updateCinemaFilter('')
      return;
    }
    updateCinemaFilter(cinema.id)
    replaceUrlParam('cinema', cinema.id);
  };

  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска"/>
      <Label title="Название">
        <Input placeholder="Введите название" onChange={ onChangeFilmName }/>
      </Label>
      <Label title="Жанр">
        <Dropdown
          options={ genres.map(genre => ({ value: GenreToText[genre] }))}
          onSelected={ onSelectFilmGenre }
          placeholder="Выберите жанр"
        />
      </Label>
      <Label title="Кинотеатр">
        <Dropdown
          options={ cinemas.map(cinema => ({ value: cinema.name}))}
          onSelected={ onSelectCinema }
          placeholder="Выберите кинотеатр"
        />
      </Label>
    </div>
  );
};

export default FilmFilter;
