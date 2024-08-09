import React from "react";
import {QueryClient} from "@tanstack/react-query";


import {fetchCinemas, fetchMovies,} from "@/api";
import getQueryClient from "@/app/getQueryClient";
import {cinemasKey, getMoviesKey} from "@/entities/film/const";
import {DehydrateState} from "@/shared/ui/DehydrateState";
import {HomePageClient} from "@/app/Home.client";

async function Home() {
    const queryClient: QueryClient = getQueryClient()

    const promises: Promise<any>[] = [];

    const page = 0;
    const moviesKey: string = getMoviesKey(page);
    const promise1 = queryClient.prefetchQuery({queryKey: [cinemasKey], queryFn: fetchCinemas})
    const promise2 = queryClient.prefetchQuery({queryKey: [moviesKey], queryFn: fetchMovies(page)})

    promises.push(promise1);
    promises.push(promise2);

    await Promise.all(promises);

    return (
        <DehydrateState queryClient={queryClient}>
            <HomePageClient/>
        </DehydrateState>
    );
}

export default Home;
