'use client';
import React, {useEffect} from 'react';
import cn from 'classnames';

import FilterTitle from '@/components/Film/FilmSearch/FilmFilter/FilterTitle';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';

import styles from './stylesFilmFilter.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setCinema, setGenre, setName} from "@/redux/store/features/filterSlice";

export type Cinema = {
  id: string,
  name: string,
  movieIds: string[],
};

export type FilmFilterPropsType = {
  className?: string,
};

const updateURLParameter = (url, param, paramVal) => {
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  let rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}
const replaceUrlParam = (key: string, value) => {
  window.history.replaceState('', '', updateURLParameter(window.location.href, key, value));
}

const getParam = (key) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key) || '';
};

const DEFAULT_VALUE = 'Все';

const FilmFilter: React.FC<FilmFilterPropsType> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const films = useSelector(state => state.films.films) || [];
  const genres = Array.from(new Set(films.map(film => film.genre)).values());
  const cinemas = useSelector(state => state.films.cinemas) || [];

  useEffect(() => {
    const name = getParam("name");
    const genre = getParam("genre");
    const cinema = getParam("cinema");
    dispatch(setCinema(cinema));
    dispatch(setName(name));
    dispatch(setGenre(genre));
  }, [])
  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска"/>
      <Label title="Название">
        <Input placeholder="Введите название" onChange={(value) => {
          dispatch(setName(value));
          replaceUrlParam("name", value);
        }}/>
      </Label>
      <Label title="Жанр">
        <select placeholder="Выберите жанр" onChange={e => {
          const val = e.target.value;
          dispatch(setGenre(val === DEFAULT_VALUE ? '' : val));
          replaceUrlParam("genre", val === DEFAULT_VALUE ? '' : val);
        }}>
          {[undefined, ...genres].map((genre: string) => <option id={genre} value={genre}>{genre || 'Все'}</option>)}
        </select>
      </Label>
      <Label title="Кинотеатр">
        <select placeholder="Выберите кинотеатр" onChange={e => {
          const id = cinemas.find((it: Cinema) => it.id === e.target.value).id;
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
