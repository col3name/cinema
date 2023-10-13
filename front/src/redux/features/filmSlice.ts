import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';
import {Cinema} from '@/components/Film/FilmSearch/FilmFilter';
import {Review} from '@/types/types';

type ReviewState = {
  list: Review[],
  filmId: string,
};

type Reviews = { [id: number]: Review[] };
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
    setReviews(state: FilmState, action: PayloadAction<ReviewState>) {
      const { filmId, list } = action.payload;
      state.reviews[filmId] = list
    }
  },
});
export const { setFilms, setReviews, setCinemas } = filmSlice.actions;

export default filmSlice.reducer;