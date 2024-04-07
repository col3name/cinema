"use client";

import React from "react";

import Layout from "@/components/Layout";
import PageContent from "@/components/Common/PageContent";
import PopupFilmRemove from "@/components/Cart/popups/PopupFilmRemove";
import FilmDetails from "@/pages/filmDetails";

interface FilmPageParams {
  id: string;
}
interface FilmPageProps {
  params: FilmPageParams;
}

const FilmPage: React.FC<FilmPageProps> = ({ params }) => {
  const filmId = params.id;

  return (
    <Layout>
      <PageContent>
        <FilmDetails filmId={filmId} />
        <PopupFilmRemove />
      </PageContent>
    </Layout>
  );
};

export default FilmPage;
