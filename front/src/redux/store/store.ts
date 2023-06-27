import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cartSlice";
import { filterReducer }  from "./features/filterSlice";
import filmReducer from "./features/filmSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    films: filmReducer,
  },
});

export default store;