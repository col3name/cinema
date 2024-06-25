"use client";

import React from "react";

import PageContent from "@/shared/ui/PageContent";
import FilmFilter from "@/components/Film/FilmSearch/FilmFilter";
import FilmList from "@/components/Film/FilmSearch/FilmList";
import PopupFilmRemove from "@/components/Cart/popups/PopupFilmRemove";

import styles from "./stylesFilm.module.css";

const FilmSearch = () => {
    return (
        <PageContent className={styles.filmContainer} isFlex>
            <FilmFilter/>
            <FilmList/>
            <PopupFilmRemove/>
        </PageContent>
    );
};

export default FilmSearch;
