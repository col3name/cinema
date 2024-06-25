import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "@/entities/cart";
import { filterReducer } from "@/entities/filmFilter";
import {filmReducer} from "@/entities/film";

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
