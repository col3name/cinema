import { useEffect, useMemo } from "react";

import { useFilmFilter } from "@/redux/features/filmFilter/hooks";
import { getUrlParameter, replaceUrlParam } from "@/shared/lib/url";
import { TextToGenre } from "@/shared/lib/translator";
import { Cinema } from "@/redux/features/film/model";
import {
  useCinemasSelector,
  useFetchCinemas,
  useFetchMovies,
  useFilmsSelector,
} from "@/redux/features/film/hooks";
import { FilmGenre } from "@/api";

const DEFAULT_VALUE = "Все";

export const useFilmFilterActions = () => {
  const cinemas = useCinemasSelector();
  useFetchCinemas();

  const { isLoading, error } = useFetchMovies();

  const films = useFilmsSelector();
  const genres: FilmGenre[] = useMemo(
    () => Array.from(new Set(films.map((film) => film.genre)).values()),
    [films],
  );

  const { updateCinemaFilter, updateGenreFilter, updateFilmFilter } =
    useFilmFilter();

  useEffect(() => {
    const filmName = getUrlParameter("name");
    const genre = getUrlParameter("genre");
    const cinema = getUrlParameter("cinema");
    updateCinemaFilter(cinema);
    updateFilmFilter(filmName);
    const genreValue = TextToGenre[genre];
    if (!genreValue) {
      replaceUrlParam("genre", "");
    }
    updateGenreFilter(genreValue || "");
  }, [updateCinemaFilter, updateFilmFilter, updateGenreFilter]);

  const onChangeFilmName = (filmName: string) => {
    updateFilmFilter(filmName);
    replaceUrlParam("name", filmName);
  };

  const onSelectFilmGenre = (value: string) => {
    const newGenre = !value || value === DEFAULT_VALUE ? "" : value;
    updateGenreFilter(TextToGenre[newGenre] || "");
    replaceUrlParam("genre", newGenre);
  };

  const onSelectCinema = (cinemaName: string) => {
    const cinema = cinemas.find((it: Cinema) => it.name === cinemaName);
    if (!cinema) {
      replaceUrlParam("cinema", "");
      updateCinemaFilter("");
      return;
    }
    updateCinemaFilter(cinema.id);
    replaceUrlParam("cinema", cinema.id);
  };

  return {
    isLoading,
    error,
    cinemas,
    genres,
    onChangeFilmName,
    onSelectFilmGenre,
    onSelectCinema,
  };
};
