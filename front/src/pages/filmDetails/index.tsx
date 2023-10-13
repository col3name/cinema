'use client';

import React, {useEffect} from 'react';

import FilmDetailsItem from '@/components/Film/FilmDetails';
import Reviews from '@/components/Film/Reviews';

import {fetchReview, Film} from '@/api/api';
import {setReviews} from '@/redux/features/filmSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {RootState} from "@/redux/store";

export type FilmDetailsPropsType = {
  film: Film,
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({
  film,
}) => {
  const dispatch = useAppDispatch();
  const review: string = useAppSelector((state: RootState) => state.films.reviews.filmId)
  useEffect(() => {
    const filmId = film.id;
    if (review && filmId && review === filmId) {
      return;
    }
    dispatch(setReviews({filmId, list: []}));
    fetchReview(filmId).then(reviews => {
      dispatch(setReviews({ filmId, list: reviews }))
    })
  }, [film.id, dispatch, review]);
  return <>
    <FilmDetailsItem
      film={ film }
    />
    <Reviews />
  </>;
};

export default FilmDetails;
