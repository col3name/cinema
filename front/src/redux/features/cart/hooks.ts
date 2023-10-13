import {useDispatch} from 'react-redux';

import {useAppSelector} from '@/redux/hooks';
import {popupFilmRemoveOpened} from '@/redux/features/cart/selector';
import {
  closeRemoveConfirmPopup,
  confirmTheRemoveFromCart,
  openRemoveConfirmPopup,
} from '@/redux/features/cart/slice';

export const useConfirmPopupOpened = () => {
  const opened = useAppSelector(popupFilmRemoveOpened);
  const dispatch = useDispatch();
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
export const useOpenConfirmPopup = () => {
  const dispatch = useDispatch();

  return (filmId) => {
    dispatch(openRemoveConfirmPopup(filmId));
  }
}