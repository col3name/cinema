import React, {useMemo} from "react";
import {QueryClient} from "@tanstack/react-query";

import {DehydrateState} from "@/shared/ui/DehydrateState";
import {FilmContent} from "@/app/film/[id]/client";

import getQueryClient from "@/app/getQueryClient";
import {fetchMovieById} from "@/api";
import {getMovieKey} from "@/entities/film/const";

interface FilmPageParams {
    id: string;
}

interface FilmPageProps {
    params: FilmPageParams;
}

const FilmPage: React.FC<FilmPageProps> = async ({
                                                     params
                                                 }) => {
    const filmId: string = params.id;

    const queryClient: QueryClient = getQueryClient()

    const promises: Promise<void>[] = [];

    const movieKey: string = getMovieKey(filmId);

    const promiseMovie: Promise<void> = queryClient.prefetchQuery({
        queryKey: [movieKey],
        queryFn: fetchMovieById(filmId),
    });

    promises.push(promiseMovie);

    await Promise.all(promises);

    return (
        <DehydrateState queryClient={queryClient}>
            <FilmContent filmId={filmId}/>
        </DehydrateState>
    );
}

export default FilmPage;
