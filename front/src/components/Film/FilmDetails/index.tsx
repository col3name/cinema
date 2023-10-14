'use client';

import React from 'react';
import Image from 'next/image';

import Title from '@/components/Common/Tite/Title';
import Paragraph from '@/components/Common/Paragraph/Paragraph';
import FilmDescriptionItem from './FilmDescriptionItem';
import FilmActions from '@/components/Film/FilmActions';

import styles from './stylesFilmDetail.module.css';

import {Film} from '@/api/api';
import {useFilmInCartNotExist} from '@/redux/features/cart/selector';
import {Genre} from '@/shared/lib/translator';

export type FilmCardPropsType = {
  film: Film,
};

const FilmActionsWrapper: React.FC<FilmCardPropsType> = ({
  film,
}) => {
  const inCart = useFilmInCartNotExist(film.id);
  return (
    <FilmActions
      film={ film }
      enableRemove={!inCart}
    />
  )
}

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
            <FilmActionsWrapper film={ film } />
          </div>
          <FilmDescriptionItem title='Жанр: ' description={ Genre[film.genre ]} />
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