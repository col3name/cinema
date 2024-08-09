import {useEffect, useLayoutEffect, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {useAppDispatch, useAppSelector} from "@/shared/redux/hooks";
import {RootState} from "@/shared/redux/store";

import {fetchCinemas, fetchMovieById, fetchMovies, fetchReview, Film,} from "@/api";

import {appendFilms, setCinemas, setFilms, setReviews} from "./slice";
import {Cinema} from "./model";
import {Review} from "@/shared/types";
import {cinemasKey, getMovieKey, getMoviesKey} from "@/entities/film/const";

export const useFetchCinemas = () => {
  const dispatch = useAppDispatch();

  const cinemas: Cinema[] = useCinemasSelector();

  const {data, isLoading, error} = useQuery({
    queryKey: [cinemasKey],
    queryFn: fetchCinemas,
  });

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

export const useFetchMovies = (page: number = 0) => {
  const dispatch = useAppDispatch();

  const key = getMoviesKey(page);

  const {data, isLoading, error} = useQuery({
    queryKey: [key],
    queryFn: fetchMovies(page)
  });

  useLayoutEffect(() => {
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

  const movieKey: string = getMovieKey(filmId);

  const {data, isLoading, error} = useQuery({
    queryKey: [movieKey],
    queryFn: fetchMovieById(filmId),
  });

  useLayoutEffect(() => {
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

  const {data, isLoading, error} = useQuery({
    queryKey: [`/api/reviews?movieId=${filmId}`],
    queryFn: fetchReview(filmId),
  });

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
