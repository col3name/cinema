"use client";

import React from "react";

import FilmDetails from "@/pages/filmDetails";
import Layout from "@/shared/ui/Layout";
import PageContent from "@/shared/ui/PageContent";
import PopupFilmRemove from "@/components/Cart/popups/PopupFilmRemove/PopupFilmRemove";

import {useFetchMovie, useFilmReviews} from "@/entities/film";

type FilmContentProps = {
    filmId: string;
}

export const FilmContent: React.FC<FilmContentProps> = ({
  filmId,
}) => {
    useFetchMovie(filmId);
    useFilmReviews(filmId);

    return (
        <Layout>
            <PageContent>
                <FilmDetails filmId={filmId} />
                <PopupFilmRemove />
            </PageContent>
        </Layout>
    );
};