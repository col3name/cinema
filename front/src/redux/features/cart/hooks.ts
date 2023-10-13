import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {popupFilmRemoveOpened} from '@/redux/features/cart/selector';
import {
  closeRemoveConfirmPopup,
  confirmTheRemoveFromCart, decrementQuantity, removeFromCart,
} from '@/redux/features/cart/slice';

export const useConfirmPopupOpened = () => {
  const opened = useAppSelector(popupFilmRemoveOpened);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeRemoveConfirmPopup());
  }
  const remove = () => {
    dispatch(confirmTheRemoveFromCart());
    close();
  }
  return {
    opened,
    close,
    remove,
  }
}

export const useDecrementFilmInCart = () => {
  const dispatch = useAppDispatch();
  return (filmId: string) => {
    dispatch(decrementQuantity(filmId));
  }
}

export const useRemoveFromCart = () => {
  const dispatch = useAppDispatch();

  return (filmId: string) => {
    dispatch(removeFromCart(filmId));
  }
}