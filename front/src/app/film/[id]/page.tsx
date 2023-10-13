'use client';

import React from 'react';

import Layout from '@/components/Layout';
import PageContent from '@/components/Common/PageContent';
import Films from '@/app/widges/Films';

const FilmPage = (props: { params: { id: string }}) => {
  const filmId = props.params.id;
  return <Layout>
    <PageContent>
      <Films filmId={filmId} />
    </PageContent>
  </Layout>;
};

export default FilmPage;
