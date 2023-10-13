'use client';
import React, {useEffect} from 'react';
import cn from 'classnames';

import FilterTitle from '@/components/Film/FilmSearch/FilmFilter/FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';

import styles from './stylesFilmFilter.module.css';
import {setCinema, setGenre, setName} from "@/redux/features/filterSlice";
import {getUrlParameter, replaceUrlParam} from "@/shared/lib/url";
import {RootState} from "@/redux/store";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

export type Cinema = {
  id: string,
  name: string,
  movieIds: string[],
};

export type FilmFilterPropsType = {
  className?: string,
};


const DEFAULT_VALUE = 'Все';

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const films = useAppSelector((state: RootState) => state.films.films) || [];
  const cinemas = useAppSelector((state: RootState) => state.films.cinemas) || [];
  const genres = Array.from(new Set(films.map(film => film.genre)).values());

  useEffect(() => {
    const name = getUrlParameter("name");
    const genre = getUrlParameter("genre");
    const cinema = getUrlParameter("cinema");
    dispatch(setCinema(cinema));
    dispatch(setName(name));
    dispatch(setGenre(genre));
  }, [dispatch])
  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска"/>
      <Label title="Название">
        <Input placeholder="Введите название" onChange={(value: string) => {
          dispatch(setName(value));
          replaceUrlParam("name", value);
        }}/>
      </Label>
      <Label title="Жанр">
        <select placeholder="Выберите жанр" onChange={e => {
          const value = e.target.value;
          dispatch(setGenre(value === DEFAULT_VALUE ? '' : value));
          replaceUrlParam("genre", value === DEFAULT_VALUE ? '' : value);
        }}>
          {[undefined, ...genres].map((genre: string|undefined, id: number) => <option key={id} id={genre} value={genre}>{genre || 'Все'}</option>)}
        </select>
      </Label>
      <Label title="Кинотеатр">
        <select placeholder="Выберите кинотеатр" onChange={e => {
          const cinema = cinemas.find((it: Cinema) => it.id === e.target.value);
          if (!cinema) {
            return;
          }
          const { id } = cinema;
          dispatch(setCinema(id));
          replaceUrlParam("cinema", id);
        }}>
          {cinemas.map((cinema: Cinema) => <option key={cinema.id} value={cinema.id}>{cinema.name}</option>)}
        </select>
      </Label>
    </div>
  );
};

export default FilmFilter;
