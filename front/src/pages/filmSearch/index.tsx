'use client';

import React, { useEffect } from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmFilter from '@/components/Film/FilmSearch/FilmFilter';
import FilmList from '@/components/Film/FilmSearch/FilmList';

import styles from './stylesFilm.module.css';

import { fetchCinemas, fetchMovies } from '@/api/api';
import {useDispatch } from "react-redux";
import {setCinemas, setFilms} from "@/redux/store/features/filmSlice";

const FilmSearch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovies().then(films => dispatch(setFilms(films)));
    fetchCinemas().then(cinemas => dispatch(setCinemas(cinemas)))
  }, []);
  return <PageContent className={ styles.filmContainer } isFlex>
    <FilmFilter/>
    <FilmList />
  </PageContent>
}

export default FilmSearch;
