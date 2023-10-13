import {RootState} from "@/redux/store";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {addToCart, FilmOnCart} from "@/redux/features/cart/slice";
import {Film} from "@/api/api";

export const popupFilmRemoveOpened = (state: RootState) => state.cart.confirmPopup.opened;
export const popupFilmRemoveFilmId = (state: RootState) => state.cart.confirmPopup.filmId;

export const useFilmInCart = (filmId: string): boolean =>
  useAppSelector((state: RootState) => state.cart.films.find((film: FilmOnCart) => film.id === filmId) === undefined);

export const useCartFilm = (filmId: string): FilmOnCart =>
  useAppSelector((state: RootState) => state.cart.films.find((film: FilmOnCart) => film.id === filmId));

export const useTicketCount = () =>
  useAppSelector((state: RootState) => state.cart.films).reduce((acc, it) => it.quantity + acc, 0) || 0;

export const useCartIsFull = () =>
  useAppSelector((state: RootState) => state.cart.isFull);

export const useAddFilmToCart = () => {
  const dispatch = useAppDispatch();
  return (film: Film) => {
    dispatch(addToCart(film));
  }
}