'use client';

import React from 'react';

import Title from '@/components/Common/Tite/Title';
import Paragraph from '@/components/Common/Paragraph/Paragraph';
import FilmDescriptionItem from '@/components/Film/FilmDetails/FilmDescriptionItem';
import FilmActions from '@/components/Film/FilmActions';

import styles from './stylesFilmDetail.module.css';

export type FilmCardPropsType = {
  id: string,
  posterUrl: string,
  rating: number,
  title: string,
  description: string,
  countOnCart: number,
  releaseYear: number,
  cinema: string,
  session: string,
  director: string,
};

const FilmDetails: React.FC<FilmCardPropsType> = (props) => {
  const {
    id,
    film,
    posterUrl,
    rating,
    genre,
    title,
    releaseYear,
    director,
    description,
    countOnCart,
    cinema,
    session,
  } = props;
  return (
    <div className={ styles.filmDetailsContainer }>
      <div className={ styles.filmContainer }>
        <img className={ styles.filmPoster } src={ posterUrl } alt='film poster' />
        <div className={ styles.filmContent }>
          <div className={ styles.filmHeader }>
            <Title text={ title } />
            <FilmActions
              film={ film }
              needRemove
            />
          </div>
          <FilmDescriptionItem title='Жанр: ' description={ genre } />
          <FilmDescriptionItem title='Год выпуска: ' description={ releaseYear } />
          <FilmDescriptionItem title='Рейтинг: ' description={ rating } />
          <FilmDescriptionItem title='Режиссер: ' description={ director } />
          <FilmDescriptionItem title='Описание: ' />
          <Paragraph text={ description} />
        </div>
       </div>
    </div>
  )
}

export default FilmDetails;