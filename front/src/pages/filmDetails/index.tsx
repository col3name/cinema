'use client';

import React from 'react';

import FilmDetailsItem from '@/components/Film/FilmDetails';
import Reviews from '@/components/Film/Reviews';

import {Film} from '@/api/api';

export type FilmDetailsPropsType = {
  film: Film,
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({
  film,
}) => {
  return <>
    <FilmDetailsItem
      film={ film }
   />
    <Reviews filmId={ film.id } />
  </>;
};

export default FilmDetails;
