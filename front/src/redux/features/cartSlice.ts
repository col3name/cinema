import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';

export type FilmOnCart = Film & {
  quantity: number,
}

type CartState = {
  films: FilmOnCart[],
  isFull: boolean,
}

const initialState: CartState = {
  films: [],
  isFull: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Film>) => {
      const count = state.films.reduce((acc: number, item: FilmOnCart) => acc + item.quantity, 0);
      if (count >= 30) {
        return;
      }
      if (count === 29) {
        state.isFull = true;
      }
      const itemExists = state.films.find((item) => item.id === action.payload.id);
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
      const item: FilmOnCart|undefined = state.films.find((item: FilmOnCart) => item.id === action.payload);
      if (!item) {
        return;
      }
      item.quantity++;
    },
    decrementQuantity: (state: CartState, action: PayloadAction<string>) => {
      const item: FilmOnCart|undefined = state.films.find((item: FilmOnCart) => item.id === action.payload);
      if (!item) {
        return;
      }
      if (state.isFull) {
        state.isFull = false;
      }
      if (item.quantity === 1) {
        // removeFromCart(state, action)
        const index = state.films.findIndex((item: FilmOnCart) => item.id === action.payload);
        state.films.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const index = state.films.findIndex((item: FilmOnCart) => item.id === action.payload);
      state.films.splice(index, 1);
      if (state.isFull) {
        state.isFull = false;
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;