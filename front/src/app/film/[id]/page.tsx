'use client';

import React from 'react';

import Layout from '@/components/Layout';
import PageContent from '@/components/Common/PageContent';
import FilmDetails from '@/pages/filmDetails';
import Paragraph from '@/components/Common/Paragraph/Paragraph';

import { Film } from '@/api/api';
import {useSelector} from "react-redux";

const FilmPage = (props: { params: { id: string }}) => {
  const filmId = props.params.id;
  const films = useSelector(state => state.films.films);
  const findFilm = films.filter((film: Film) => film.id === filmId);
  return <Layout>
    <PageContent>
      { findFilm?.length !== 1 ? (
        <Paragraph>Not found</Paragraph>
      ) : (
        <FilmDetails
          film={ findFilm[0] }
        />
      )}
    </PageContent>
  </Layout>;
};

export default FilmPage;
