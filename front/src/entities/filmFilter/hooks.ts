import { useAppDispatch } from "@/shared/redux/hooks";
import { setCinema, setGenre, setFilmName } from "./slice";
import { FilmGenre } from "@/api";

export const useFilmFilter = () => {
  const dispatch = useAppDispatch();
  const updateCinemaFilter = (cinema: string) => {
    dispatch(setCinema(cinema));
  };
  const updateGenreFilter = (genre: FilmGenre) => {
    dispatch(setGenre(genre));
  };
  const updateFilmFilter = (film: string) => {
    return dispatch(setFilmName(film));
  };

  return {
    updateCinemaFilter,
    updateGenreFilter,
    updateFilmFilter,
  };
};
