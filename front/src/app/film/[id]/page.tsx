import React from 'react';

import Layout from '@/components/Layout';
import PageContent from '@/components/Common/PageContent';
import FilmDetails from '@/pages/filmDetails';
import Paragraph from '@/components/Common/Paragraph/Paragraph';

import { Film, films, reviews } from '@/api/api';

const FilmPage = (props: { params: { id: string }}) => {
  const filmId = props.params.id;
  const findFilm = films.filter((film: Film) => film.id === filmId);
  console.log(findFilm[0]);

  // return <div>asdfasf</div>;
  // console.log(film);
  // console.log(reviews);
  return <Layout>
    <PageContent>
      {/*<div>id: { props.params.id }</div>*/}
      { findFilm?.length !== 1 ? (
        <Paragraph>Not found</Paragraph>
      ) : (
        // <div>{ findFilm[0].title }</div>
        <FilmDetails
          film={ findFilm[0] }
          reviews={ findFilm[0]?.reviewIds?.map(id => reviews.find(it => it.id === id)).filter(it => it) }
        />
      )}
    </PageContent>
  </Layout>;
};

export default FilmPage;
