import {RootState} from '@/redux/store';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {addToCart, FilmOnCart} from './slice';
import {Film} from '@/api/api';

export const usePopupFilmRemoveOpened = (): boolean =>
  useAppSelector((state: RootState) => state.cart.confirmPopup.opened);

export const useCartFilmsSelector = (): FilmOnCart[] =>
  useAppSelector((state: RootState) => state.cart.films) || [];

export const useFilmInCartNotExist = (filmId: string): boolean =>
  useAppSelector((state: RootState) => state.cart.films.find((film: FilmOnCart) => film.id === filmId) === undefined);

export const useCartFilm = (filmId: string): FilmOnCart|undefined =>
  useAppSelector((state: RootState) => state.cart.films.find((film: FilmOnCart) => film.id === filmId));

export const useTicketCount = (): number =>
  useAppSelector((state: RootState) => state.cart.films).reduce((acc, it) => it.quantity + acc, 0) || 0;

export const useCartIsFull = (): boolean =>
  useAppSelector((state: RootState) => state.cart.isFull);

export const useAddFilmToCart = () => {
  const dispatch = useAppDispatch();
  return (film: Film) => {
    dispatch(addToCart(film));
  }
}