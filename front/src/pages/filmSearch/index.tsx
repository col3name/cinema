"use client";

import React, { Suspense } from "react";

import PageContent from "@/components/Common/PageContent";
import FilmFilter from "@/components/Film/FilmSearch/FilmFilter";
import FilmList from "@/components/Film/FilmSearch/FilmList";
import PopupFilmRemove from "@/components/Cart/popups/PopupFilmRemove";

import styles from "./stylesFilm.module.css";

const FilmSearch = () => {
  return (
    <PageContent className={styles.filmContainer} isFlex>
      <FilmFilter />
      <Suspense fallback={<div>Loading</div>}>
        <FilmList />
      </Suspense>
      <PopupFilmRemove />
    </PageContent>
  );
};

export default FilmSearch;
