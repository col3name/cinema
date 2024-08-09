"use client";

import React from "react";

import PageContent from "@/shared/ui/PageContent";
import FilmFilter from "@/features/film/FilmFilter";
import FilmList from "@/widgets/Film/FilmSearch/FilmList";

import styles from "./stylesFilm.module.css";
import PopupFilmRemoveConfirm from "@/widgets/Cart/popups/PopupFilmRemoveConfirm";

const FilmSearch = () => {
    return (
        <PageContent className={styles.filmContainer} isFlex>
            <FilmFilter/>
            <FilmList/>
            <PopupFilmRemoveConfirm/>
        </PageContent>
    );
};

export default FilmSearch;
