"use client";

import React from "react";

import Layout from "@/shared/ui/Layout";
import PageContent from "@/shared/ui/PageContent";
import FilmDetails from "@/pages/filmDetails";
import PopupFilmRemoveConfirm from "@/widgets/Cart/popups/PopupFilmRemoveConfirm";

interface FilmPageParams {
  id: string;
}
interface FilmPageProps {
  params: FilmPageParams;
}

const FilmPage: React.FC<FilmPageProps> = ({ params }) => {
  const filmId = params?.id;

  return (
    <Layout>
      <PageContent>
        <FilmDetails filmId={filmId} />
        <PopupFilmRemoveConfirm />
      </PageContent>
    </Layout>
  );
};

export default FilmPage;
