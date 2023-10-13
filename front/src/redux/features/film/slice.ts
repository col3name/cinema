import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';
import {Review} from '@/shared/types/types';
import {Cinema} from "./model";

type ReviewState = {
  list: Review[],
  filmId: string,
};

type Reviews = { [id: string]: Review[] };

type FilmState = {
  films: Film[],
  cinemas: Cinema[],
  reviews: Reviews,
}

const initialState: FilmState = {
  films: [],
  cinemas: [],
  reviews: {},
};

const slice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state: FilmState, action: PayloadAction<Film[]>) {
      state.films = action.payload;
    },
    setCinemas(state: FilmState, action: PayloadAction<Cinema[]>) {
      state.cinemas = [...action.payload];
    },
    setReviews(state: FilmState, action: PayloadAction<ReviewState>) {
      const { filmId, list } = action.payload;
      state.reviews[filmId] = list
    }
  },
});
export const { setFilms, setReviews, setCinemas } = slice.actions;

export default slice.reducer;