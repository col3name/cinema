'use client';

import React, { useEffect, Suspense } from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmFilter from '@/components/Film/FilmSearch/FilmFilter';
import FilmList from '@/components/Film/FilmSearch/FilmList';
import PopupFilmRemove from '@/components/Cart/popups/PopupFilmRemove';

import styles from './stylesFilm.module.css';

import {useFetchCinemas, useFetchMovies} from '@/redux/features/film/hooks';

const FilmSearch = () => {
  const updateCinemas = useFetchCinemas();
  const updateMovies = useFetchMovies();

  useEffect(() => {
    updateMovies()
    updateCinemas()
  }, [updateMovies, updateCinemas]);
  return <PageContent className={ styles.filmContainer } isFlex>
    <FilmFilter/>
    <Suspense fallback={ <div>Loading</div>}>
      <FilmList />
    </Suspense>
    <PopupFilmRemove />
  </PageContent>
}

export default FilmSearch;
