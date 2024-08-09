'use client';

import React from "react";

import FilmSearch from "@/pages/filmSearch";
import {useFetchCinemas, useFetchMovies} from "@/entities/film";
import Layout from "@/shared/ui/Layout";

type HomeBodyProps = {
}

export const HomePageClient: React.FC<HomeBodyProps> = () =>  {
    useFetchCinemas();
    useFetchMovies();

    return (
        <Layout>
            <FilmSearch/>
        </Layout>
    );
}
