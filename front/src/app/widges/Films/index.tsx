import React, {useEffect, useState} from 'react';

import {RootState} from '@/redux/store';
import {fetchMovies, Film} from '@/api/api';

import Paragraph from '@/components/Common/Paragraph/Paragraph';
const FilmDetails = React.lazy(() => import('@/pages/filmDetails'))

import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setFilms} from '@/redux/features/filmSlice';

type FilmsPropsType = {
  filmId: string,
}

const Films: React.FC<FilmsPropsType> = ({
  filmId
})  => {
  const film = useAppSelector((state: RootState) => state.films.films.find((film: Film) => film.id === filmId));
  const dispatch = useAppDispatch();
  const [notFound, setNotFound] = useState<boolean>(film === undefined);
  const [loading, setLoading] = useState<boolean>(film === undefined);
  useEffect(() => {
    if (!film) {
      setLoading(true)
      fetchMovies()
        .then(films => {
          dispatch(setFilms(films));
          setLoading(false);
        })
        .catch(() => {
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [film, setNotFound, dispatch])

  if (loading) {
    return <div>Loading</div>
  }
  if (!film || notFound) {
    return <Paragraph>Not found</Paragraph>
  }
  return <FilmDetails film={ film }/>
}

export default Films;