'use client';

import React from 'react';
import Image from 'next/image';

import DataHOC from '@/components/Common/DataHOC';
import Title from '@/components/Common/Tite';
import Paragraph from '@/components/Common/Paragraph';
import FilmDescriptionItem from './FilmDescriptionItem';
import FilmActionsWrapper from '@/components/Film/FilmDetails/FilmActionsWrapper';

import styles from './stylesFilmDetail.module.css';

import {Film} from '@/api';
import {GenreToText} from '@/shared/lib/translator';
import {useFetchMovie, useFindFilmSelector} from '@/redux/features/film/hooks';

export type FilmCardPropsType = {
  filmId: string,
};

interface FilmDataProps {
  film: Film;
}

const FilmData: React.FC<FilmDataProps> = ({film}: {film: Film}) => {
  return (
    <div className={ styles.filmDetailsContainer }>
      <div className={ styles.filmContainer }>
        <Image className={ styles.filmPoster } src={ film.posterUrl } alt='film poster' width={320} height={240} />
        <div className={ styles.filmContent }>
          <div className={ styles.filmHeader }>
            <Title text={ film.title } />
            <FilmActionsWrapper film={ film } />
          </div>
          <FilmDescriptionItem title='Жанр: ' description={ GenreToText[film.genre ]} />
          <FilmDescriptionItem title='Год выпуска: ' description={ film.releaseYear } />
          <FilmDescriptionItem title='Рейтинг: ' description={ film.rating } />
          <FilmDescriptionItem title='Режиссер: ' description={ film.director } />
          <FilmDescriptionItem title='Описание: ' />
          <Paragraph text={ film.description } />
        </div>
      </div>
    </div>
  )
};

const FilmDetails: React.FC<FilmCardPropsType> = ({
  filmId,
}) => {
  const film = useFindFilmSelector(filmId) as Film;
  const { isLoading, error } = useFetchMovie(filmId);

  return (
    <DataHOC data={film} isLoading={isLoading} loaderText="movie" error={error}>
      <FilmData film={film} />
    </DataHOC>
  );
}

export default FilmDetails;