'use client';
import React, {useMemo} from 'react';
import cn from 'classnames';

import FilterTitle from './FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Dropdown from '@/components/Common/Dropdown';

import styles from './stylesFilmFilter.module.css';

import {useCinemasSelector, useFetchCinemas, useFetchMovies, useFilmsSelector} from '@/redux/features/film/hooks';
import {useFilmFilterActions} from '@/components/Film/FilmSearch/FilmFilter/hooks';
import {FilmGenre} from '@/api';
import {GenreToText} from '@/shared/lib/translator';

export type FilmFilterPropsType = {
  className?: string,
};

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
}) => {
  const {isLoading, error} = useFetchMovies();
  useFetchCinemas();

  const films = useFilmsSelector()
  const genres: FilmGenre[] = useMemo(() => Array.from(new Set(films.map(film => film.genre)).values()), [films]);
  const cinemas = useCinemasSelector();

  const {
    onChangeFilmName,
    onSelectFilmGenre,
    onSelectCinema,
  } = useFilmFilterActions({cinemas});

  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска"/>
      <Label title="Название">
        <Input placeholder="Введите название" onChange={onChangeFilmName}/>
      </Label>
      <Label title="Жанр">
        <Dropdown
          options={genres.map(genre => ({value: GenreToText[genre]}))}
          onSelected={onSelectFilmGenre}
          placeholder="Выберите жанр"
        />
      </Label>
      <Label title="Кинотеатр">
        <Dropdown
          options={cinemas.map(cinema => ({value: cinema.name}))}
          onSelected={onSelectCinema}
          placeholder="Выберите кинотеатр"
          isDisabled={isLoading || error}
        />
      </Label>
    </div>
  );
};

export default FilmFilter;
