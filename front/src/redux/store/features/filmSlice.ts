import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  cinemas: [],
  reviews: [],
};

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action) {
      state.films = action.payload;
    },
    setCinemas(state, action) {
      state.cinemas = [{
        id: '',
        name: "Все",
        movieIds: []
      }, ...action.payload];
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    }
  },
});
export const { setFilms, setReviews, setCinemas } = filmSlice.actions;

export default filmSlice.reducer;