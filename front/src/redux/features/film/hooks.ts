import { useEffect } from "react";
import useSWR from "swr";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import {
  fetchCinemas,
  fetchMovie,
  fetchMovies,
  fetchReview,
  Film,
} from "@/api";

import { setCinemas, setFilms, setReviews } from "./slice";
import { Cinema } from "./model";
import { Review } from "@/shared/types";

export const useFetchCinemas = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWR("/api/cinemas", fetchCinemas);

  useEffect(() => {
    if (data) {
      dispatch(setCinemas(data));
    }
  }, [data, dispatch]);

  return {
    cinemas: data,
    isLoading,
    error,
  };
};

export const useFetchMovies = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWR("/api/movies", fetchMovies);

  useEffect(() => {
    if (data) {
      dispatch(setFilms(data));
    }
  }, [dispatch, data]);

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
