import React, {useEffect, useState} from 'react';

import Paragraph from '@/components/Common/Paragraph/Paragraph';
import FilmDetails from '@/pages/filmDetails';

import {useFetchMovie, useFindFilmSelector} from '@/redux/features/film/hooks';

type FilmsPropsType = {
  filmId: string,
}

const Films: React.FC<FilmsPropsType> = ({
  filmId
})  => {
  const film = useFindFilmSelector(filmId);
  const fetchMovie = useFetchMovie();

  const [notFound, setNotFound] = useState<boolean>(film === undefined);
  const [loading, setLoading] = useState<boolean>(film === undefined);
  useEffect(() => {
    if (!film) {
      setLoading(true)
      fetchMovie(filmId)
        .then(() => {
          setLoading(false);
          setNotFound(false);
        })
        .catch(() => {
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [fetchMovie, film, filmId, setNotFound])

  if (loading) {
    return <div>Loading</div>
  }
  if (!film || notFound) {
    return <Paragraph>Not found</Paragraph>
  }
  return <FilmDetails film={ film }/>
}

export default Films;