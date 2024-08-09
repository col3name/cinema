import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {useAppDispatch} from "@/shared/redux/hooks";
import {setFilms} from "@/entities/film/slice";
import {fetcher} from "@/shared/lib/fetcher";

export const useFetchBook = (filmId: string) => {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(0);
    const url = `/api/books?movieId=${filmId}&page=${page}`;
    const {data, isLoading, error} = useQuery({
        queryKey: [url],
        queryFn: async () => await fetcher(url),
    });

    const nextPage = () => {
        setPage((prev) => prev + 2);
    };

    const prevPage = () => {
        setPage((prev) => prev - 2);
    };

    useEffect(() => {
        if (data) {
            dispatch(setFilms([data]));
        }
    }, [data, dispatch]);

    return {
        book: data,
        isLoading,
        error,
        page,
        nextPage,
        prevPage,
    };
};