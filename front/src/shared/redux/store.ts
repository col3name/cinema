import { configureStore } from "@reduxjs/toolkit";

import {typeRacingReducer} from "@/entities/typeRacing/slice";

const store = configureStore({
  reducer: {
    typeRacing: typeRacingReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
