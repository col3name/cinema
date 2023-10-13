'use client';

import React from 'react';
import Image from 'next/image';

import Title from '@/components/Common/Tite/Title';
import Paragraph from '@/components/Common/Paragraph/Paragraph';
import FilmDescriptionItem from '@/components/Film/FilmDetails/FilmDescriptionItem';
import FilmActions from '@/components/Film/FilmActions';

import styles from './stylesFilmDetail.module.css';

import {Film} from '@/api/api';

export type FilmCardPropsType = {
  film: Film,
};

const FilmDetails: React.FC<FilmCardPropsType> = ({
  film
}) => {
  return (
    <div className={ styles.filmDetailsContainer }>
      <div className={ styles.filmContainer }>
        <Image className={ styles.filmPoster } src={ film.posterUrl } alt='film poster' width={320} height={240} />
        <div className={ styles.filmContent }>
          <div className={ styles.filmHeader }>
            <Title text={ film.title } />
            <FilmActions
              film={ film }
              needRemove
            />
          </div>
          <FilmDescriptionItem title='Жанр: ' description={ film.genre } />
          <FilmDescriptionItem title='Год выпуска: ' description={ film.releaseYear } />
          <FilmDescriptionItem title='Рейтинг: ' description={ film.rating } />
          <FilmDescriptionItem title='Режиссер: ' description={ film.director } />
          <FilmDescriptionItem title='Описание: ' />
          <Paragraph text={ film.description } />
        </div>
       </div>
    </div>
  )
}

export default FilmDetails;