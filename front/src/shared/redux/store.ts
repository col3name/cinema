import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "@/entities/cart";
import { filterReducer } from "@/entities/filmFilter";
import {filmReducer} from "@/entities/film";
import {raceReducer} from "@/entities/race/slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    films: filmReducer,
    race: raceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
