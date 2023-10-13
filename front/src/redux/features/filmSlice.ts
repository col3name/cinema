import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';
import {Cinema} from '@/components/Film/FilmSearch/FilmFilter';
import {Review} from '@/types/types';

type FilmState = {
  films: Film[],
  cinemas: Cinema[],
  reviews: Review[],
}
const initialState: FilmState = {
  films: [],
  cinemas: [],
  reviews: [],
};

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state: FilmState, action: PayloadAction<Film[]>) {
      state.films = action.payload;
    },
    setCinemas(state: FilmState, action: PayloadAction<Cinema[]>) {
      state.cinemas = [{
        id: '',
        name: "Все",
        movieIds: []
      }, ...action.payload];
    },
    setReviews(state: FilmState, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    }
  },
});
export const { setFilms, setReviews, setCinemas } = filmSlice.actions;

export default filmSlice.reducer;