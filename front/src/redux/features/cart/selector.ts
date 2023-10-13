import {RootState} from "@/redux/store";

export const popupFilmRemoveOpened = (state: RootState) => state.cart.confirmPopup.opened;
export const popupFilmRemoveFilmId = (state: RootState) => state.cart.confirmPopup.filmId;
