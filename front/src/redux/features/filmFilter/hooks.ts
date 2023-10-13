import {useAppDispatch} from "@/redux/hooks";
import {setCinema, setGenre} from "@/redux/features/filmFilter/filterSlice";
import {setFilms} from "@/redux/features/film/slice";

export const useFilmFilter = () => {
  const dispatch = useAppDispatch();
  const updateCinemaFilter = (cinema: string) => {
    dispatch(setCinema(cinema));
  }
  const updateGenreFilter = (genre: string) => {
    dispatch(setGenre(genre));
  }
  const updateFilmFilter = (film: string) => {
    dispatch(setFilms(film));
  }

  return {
    updateCinemaFilter,
    updateGenreFilter,
    updateFilmFilter,
  }
}