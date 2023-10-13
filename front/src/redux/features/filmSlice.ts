import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from '@/api/api';
import {Cinema} from '@/components/Film/FilmSearch/FilmFilter';
import {Review} from '@/types/types';

type ReviewState = {
  list: Review[],
  filmId: string,
};

type FilmState = {
  films: Film[],
  cinemas: Cinema[],
  reviews: ReviewState,
}
const initialState: FilmState = {
  films: [],
  cinemas: [],
  reviews: {
    filmId: undefined,
    list: [],
  } as ReviewState,
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
      state.reviews.list = action.payload.list;
      state.reviews.filmId = action.payload.filmId;
      console.log(action.payload.list)
    }
  },
});
export const { setFilms, setReviews, setCinemas } = filmSlice.actions;

export default filmSlice.reducer;