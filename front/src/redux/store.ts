import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from './features/cart/slice';
import { filterReducer }  from './features/filmFilter/filterSlice';
import filmReducer from './features/film/slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    films: filmReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;