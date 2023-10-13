
import {fetchCinemas, fetchMovies, fetchReview, Film} from '@/api/api';
import {setCinemas, setFilms, setReviews} from './slice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';
import {Cinema} from './model';
import {Review} from '@/shared/types/types';

export const useFetchCinemas = () => {
  const dispatch = useAppDispatch();
  return () => {
    return fetchCinemas().then(cinemas => dispatch(setCinemas(cinemas)))
  }
}
export const useFetchMovies = () => {
  const dispatch = useAppDispatch();
  return () => {
    return fetchMovies().then(films => dispatch(setFilms(films)));
  }
}

export const useFilmReviews = (filmId: string) => {
  const reviews: Review[] = useFilmReviewsSelector(filmId);
  const dispatch = useAppDispatch();
  const updateReviews = (filmId: string): Promise<any> => {
    if (reviews.length > 0 && filmId) {
      return Promise.resolve();
    }
    dispatch(setReviews({ filmId, list: []}));
    return fetchReview(filmId).then(reviews =>
      dispatch(setReviews({ filmId, list: reviews }))
    )
  }
  return {
    reviews,
    updateReviews,
  }
}

export const useFindFilmSelector = (filmId: string): Film|undefined => {
  return useAppSelector((state: RootState) => state.films.films.find((film: Film) => film.id === filmId));
}

export const useFilmsSelector = (): Film[] =>
  useAppSelector((state: RootState) => state.films.films) || [];

export const useCinemasSelector = (): Cinema[] =>
  useAppSelector((state: RootState) => state.films.cinemas) || [];

export const useFilmReviewsSelector = (filmId: string): Review[] =>
  useAppSelector((state: RootState) => state.films.reviews[filmId]) || [];
