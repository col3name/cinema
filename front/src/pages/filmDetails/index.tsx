'use client';

import React, {useEffect} from 'react';

import PageContent from '@/components/Common/PageContent';
import FilmDetailsItem from '@/components/Film/FilmDetails';
import Reviews from '@/components/Film/Reviews';

import {fetchReview, Film} from "@/api/api";
import {useDispatch} from "react-redux";
import {setReviews} from "@/redux/store/features/filmSlice";

const cart = new Map<string, number>();

export type FilmDetailsPropsType = {
  film: Film,
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({
  film,
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setReviews([]));
    fetchReview(film.id).then(reviews => dispatch(setReviews(reviews)))
  }, [film.id]);
  return <PageContent>
    <FilmDetailsItem
      id={ film.id }
      film={ film }
      posterUrl={ film.posterUrl }
      rating={ film.rating }
      title={ film.title }
      releaseYear={ film.releaseYear }
      description={ film.description }
      director={ film.director }
      cinema={ '' }
      session={ '' }
      tickerCount={ 0 }
     countOnCart={ 0 }
    />
    <Reviews />
  </PageContent>;
};

export default FilmDetails;
