'use client';

import React, { useEffect } from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmFilter from '@/components/Film/FilmSearch/FilmFilter';
import FilmList from '@/components/Film/FilmSearch/FilmList';

import styles from './stylesFilm.module.css';

import {cinemas, films, reviews} from '@/api/api';

const cart = new Map<string, number>();

const FilmSearch = () => {
  const list = films.map(film => ({
    ...film,
    reviews: film.reviewIds.map(id => reviews.find(it => it.id === id)).filter(it => it)
  }));

  const addFilmToCart = (filmId) => {
    if (cart.has(filmId)) {
      cart.set(filmId, cart.get(filmId) + 1);
    } else {
      cart.set(filmId, 1);
    }
  };

  const removeFilmToCart = (filmId) => {
    if (cart.has(filmId)) {
      cart.set(filmId, cart.get(filmId) + 1);
    } else {
      cart.set(filmId, 1);
    }
  };
  useEffect(() => {
    console.log({ cart });
  }, [cart.size]);

  const genres = Array.from(new Set(films.map(film => film.genre)).values());
  return <PageContent className={ styles.filmContainer }>
    <FilmFilter
      cinemas={ cinemas }
      genres={ genres}
    />
    <FilmList
      films={ list }
      addFilmToCart={ addFilmToCart }
      removeFilmFromCart={ removeFilmToCart }
    />
  </PageContent>
}

export default FilmSearch;
