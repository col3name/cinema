'use client';

import React from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmDetailsItem from '@/components/Film/FilmDetails';
import Reviews from '@/components/Film/Reviews';

import { FilmData, Review } from '@/types/types';
import {Film} from "@/api/api";

const cart = new Map<string, number>();

export type FilmDetailsPropsType = {
  film: Film,
  reviews: Review[],
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({
  film,
  reviews,
}) => {
  // console.log({ film })
  const addFilmToCart = (filmId: string) => {
    if (cart.has(filmId)) {
      cart.set(filmId, cart.get(filmId) + 1);
    } else {
      cart.set(filmId, 1);
    }
  };

  const removeFilmToCart = (filmId: string) => {
    if (cart.has(filmId)) {
      cart.set(filmId, cart.get(filmId) + 1);
    } else {
      cart.set(filmId, 1);
    }
  };

  return <PageContent>
    <FilmDetailsItem
      id={ film.id }
      posterUrl={ film.posterUrl }
      rating={ film.rating }
      title={ film.title }
      releaseYear={ film.releaseYear }
      description={ film.description }
      director={ film.director }
      cinema={ '' }
      session={ '' }
      tickerCount={ 0 }
      addFilmToCart={ addFilmToCart }
      removeFilmFromCart={ removeFilmToCart }
     countOnCart={ 0 }
    />
    <Reviews reviews={ reviews } />
  </PageContent>;
};

export default FilmDetails;
