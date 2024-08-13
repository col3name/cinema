import { configureStore } from "@reduxjs/toolkit";

import {raceReducer} from "@/entities/race/slice";

const store = configureStore({
  reducer: {
    race: raceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
