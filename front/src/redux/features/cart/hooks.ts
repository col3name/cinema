import {useAppDispatch} from '@/redux/hooks';
import {usePopupFilmRemoveOpened} from './selector';
import {
  closeRemoveConfirmPopup,
  confirmTheRemoveFromCart,
  decrementQuantity,
  removeFromCart,
} from './slice';

export const useConfirmPopupOpened = () => {
  const opened = usePopupFilmRemoveOpened();
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