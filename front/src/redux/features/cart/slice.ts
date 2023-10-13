import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';

export type FilmOnCart = Film & {
  quantity: number,
}

type ConfirmPopupData = {
  opened: boolean,
  filmId: string|undefined
}

type CartState = {
  films: FilmOnCart[],
  isFull: boolean,
  confirmPopup: ConfirmPopupData
}

const initialState: CartState = {
  films: [],
  isFull: false,
  confirmPopup: { opened: false, filmId: undefined } as ConfirmPopupData
}

const findFilm = (films: FilmOnCart[], filmId: string): FilmOnCart|undefined => films.find((film: FilmOnCart) => film.id === filmId);

const slice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Film>) => {
      const count = state.films.reduce((acc: number, film: FilmOnCart) => acc + film.quantity, 0);
      if (count >= 30) {
        return;
      }
      if (count === 29) {
        state.isFull = true;
      }
      const itemExists = findFilm(state.films, action.payload.id)
      if (itemExists) {
        if (itemExists.quantity >= 30)  {
          return;
        }
        itemExists.quantity++;
      } else {
        state.films.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state: CartState, action: PayloadAction<string>) => {
      const item: FilmOnCart|undefined = findFilm(state.films, action.payload)
      if (!item) {
        return;
      }
      item.quantity++;
    },
    decrementQuantity: (state: CartState, action: PayloadAction<string>) => {
      const filmId = action.payload;
      const item: FilmOnCart|undefined = findFilm(state.films, filmId)
      if (!item) {
        return;
      }
      if (state.isFull) {
        state.isFull = false;
      }
      if (item.quantity === 1) {
        state.confirmPopup.opened = true;
        state.confirmPopup.filmId = filmId;
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const filmId = action.payload;
      const item: FilmOnCart|undefined = findFilm(state.films, filmId)
      if (!item) {
        return;
      }
      if (state.confirmPopup.opened && state.confirmPopup.filmId === filmId) {
        return
      }
      state.confirmPopup.opened = true;
      state.confirmPopup.filmId = filmId;
    },
    confirmTheRemoveFromCart: (state: CartState) => {
      const filmId = state.confirmPopup.filmId;
      if (!filmId) {
        return;
      }
      const index = state.films.findIndex((film: FilmOnCart) => film.id === filmId);
      state.films.splice(index, 1);
      if (state.isFull) {
        state.isFull = false;
      }
    },
    openRemoveConfirmPopup: (state: CartState, action: PayloadAction<string>) => {
      if (state.confirmPopup.opened) {
        if (state.confirmPopup.filmId !== action.payload) {
          state.confirmPopup.filmId = action.payload;
          return
        }
        return;
      }
      state.confirmPopup.opened = true;
      state.confirmPopup.filmId = action.payload;
    },
    closeRemoveConfirmPopup: (state: CartState) => {
      if (!state.confirmPopup.opened) {
        return;
      }
      state.confirmPopup.filmId = undefined;
      state.confirmPopup.opened = false;
    },
  },
});

export const cartReducer = slice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  confirmTheRemoveFromCart,
  removeFromCart,
  openRemoveConfirmPopup,
  closeRemoveConfirmPopup,
} = slice.actions;