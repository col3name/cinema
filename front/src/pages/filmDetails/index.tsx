'use client';

import React, {useEffect} from 'react';

import FilmDetailsItem from '@/components/Film/FilmDetails';
import Reviews from '@/components/Film/Reviews';

import {fetchReview, Film} from '@/api/api';
import {setReviews} from '@/redux/features/filmSlice';
import {useAppDispatch} from "@/redux/hooks";

export type FilmDetailsPropsType = {
  film: Film,
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({
  film,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setReviews([]));
    fetchReview(film.id).then(reviews => dispatch(setReviews(reviews)))
  }, [film.id, dispatch]);
  return <>
    <FilmDetailsItem
      film={ film }
    />
    <Reviews />
  </>;
};

export default FilmDetails;
