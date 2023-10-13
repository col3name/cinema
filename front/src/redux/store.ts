import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './features/cartSlice';
import { filterReducer }  from './features/filterSlice';
import filmReducer from './features/filmSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    films: filmReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;