'use client';

import React, { useEffect, Suspense } from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmFilter from '@/components/Film/FilmSearch/FilmFilter';
import FilmList from '@/components/Film/FilmSearch/FilmList';

import styles from './stylesFilm.module.css';

import { fetchCinemas, fetchMovies } from '@/api/api';
import {setCinemas, setFilms} from '@/redux/features/filmSlice';
import {useAppDispatch} from '@/redux/hooks';

const FilmSearch = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchMovies().then(films => dispatch(setFilms(films)));
    fetchCinemas().then(cinemas => dispatch(setCinemas(cinemas)))
  }, [dispatch]);
  return <PageContent className={ styles.filmContainer } isFlex>
    <FilmFilter/>
    <Suspense fallback={ <div>Loading</div>}>
      <FilmList />
    </Suspense>
  </PageContent>
}

export default FilmSearch;
