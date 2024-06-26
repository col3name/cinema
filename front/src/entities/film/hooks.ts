import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { RootState } from "@/shared/redux/store";

import {
  fetchCinemas,
  fetchMovie,
  fetchReview,
  Film,
} from "@/api";

import { setCinemas, setFilms, appendFilms, setReviews } from "./slice";
import { Cinema } from "./model";
import { Review } from "@/shared/types";

export const useFetchCinemas = () => {
  const dispatch = useAppDispatch();

  const cinemas: Cinema[] = useCinemasSelector();

  const { data, isLoading, error } = useSWR("/api/cinemas", fetchCinemas);

  useEffect(() => {
    if (data) {
      dispatch(setCinemas([...cinemas, ...data]));
    }
  }, [data, dispatch]);

  return {
    cinemas: data,
    isLoading,
    error,
  };
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchMovies = (page: number) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWR(
    `/api/movies?page=${page}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      if (Number(page) === 0) {
        dispatch(setFilms(data));
      } else {
        dispatch(appendFilms(data));
      }
    }
  }, [dispatch, data, page]);

  return {
    movies: data,
    isLoading,
    error,
  };
};

export const useFetchMovie = (filmId: string) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWR(
    `/api/movie?movieId=${filmId}`,
    fetchMovie(filmId),
  );

  useEffect(() => {
    if (data) {
      dispatch(setFilms([data]));
    }
  }, [data, dispatch]);

  return {
    movie: data,
    isLoading,
    error,
  };
};

export const useFetchBook = (filmId: string) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);
  const { data, isLoading, error } = useSWR(
    `/api/books?movieId=${filmId}&page=${page}`,
    fetcher,
  );

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
export const useFilmReviews = (filmId: string) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWR(
    `/api/reviews?movieId=${filmId}`,
    fetchReview(filmId),
  );

  useEffect(() => {
    if (data) {
      dispatch(setReviews({ filmId, list: data }));
    }
  }, [filmId, data, isLoading, error, dispatch]);

  return {
    reviews: data,
    isLoading,
    error,
  };
};

export const useFindFilmSelector = (filmId: string): Film | undefined => {
  return useAppSelector((state: RootState) =>
    state.films.films.find((film: Film) => film.id === filmId),
  );
};

export const useFilmsSelector = (): Film[] =>
  useAppSelector((state: RootState) => state.films.films) || [];

export const useCinemasSelector = (): Cinema[] =>
  useAppSelector((state: RootState) => state.films.cinemas) || [];

export const useFilmReviewsSelector = (filmId: string): Review[] =>
  useAppSelector((state: RootState) => state.films.reviews[filmId]) || [];
