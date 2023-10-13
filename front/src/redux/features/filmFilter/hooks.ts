import {useAppDispatch} from '@/redux/hooks';
import {setCinema, setGenre, setFilmName} from './filterSlice';

export const useFilmFilter = () => {
  const dispatch = useAppDispatch();
  const updateCinemaFilter = (cinema: string) => {
    dispatch(setCinema(cinema));
  }
  const updateGenreFilter = (genre: string) => {
    dispatch(setGenre(genre));
  }
  const updateFilmFilter = (film: string) => {
    dispatch(setFilmName(film));
  }

  return {
    updateCinemaFilter,
    updateGenreFilter,
    updateFilmFilter,
  }
}