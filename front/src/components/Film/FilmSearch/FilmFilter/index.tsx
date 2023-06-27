'use client';
import React, { useState } from 'react';
import cn from 'classnames';

import FilterTitle from '@/components/Film/FilmSearch/FilmFilter/FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';

import styles from './stylesFilmFilter.module.css';
import {Film} from "@/api/api";

export type Cinema = {
  id: string,
  name: string,
  movieIds: string[],
};

export type FilmFilterPropsType = {
  className?: string,
  cinemas: Cinema[],
  genres: string[],
};

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
  cinemas,
  genres,
}) => {
  const [name, setName] = useState<string>();
  const [genre, setGenre] = useState<string>();
  const [cinema, setCinema] = useState<Cinema>();
  return (
    <div className={ cn(styles.filmFilter, className) }>
      <FilterTitle title="Фильтр поиска" />
      <Label title="Название">
        <Input placeholder="Введите название" onChange={ (value) => setName(value) } />
      </Label>
      <Label title="Жанр">
        <select placeholder="Выберите жанр" onChange={ e => setGenre(e.target.value) } >
          { genres.map((genre: string) => <option value={genre}>{genre}</option> )}
        </select>
      </Label>
      <Label title="Кинотеатр">
        <select placeholder="Выберите кинотеатр" onChange={ e => {
          setCinema(cinemas.find((it: Cinema) => it.id === e.target.value));
        } } >
          { cinemas.map((cinema: Cinema) => <option value={cinema.id}>{cinema.name}</option> )}
        </select>
      </Label>
      <p>name: { name }</p>
      <p>genre: { genre }</p>
      <p>cinema: { cinema?.name }</p>
    </div>
  );
};

export default FilmFilter;
