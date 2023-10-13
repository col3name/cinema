import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilmFilter = {
  cinema: string,
  genre: string,
  name: string
}
type FilmFilterState = FilmFilter;

const initialState: FilmFilterState = {
  cinema: '',
  genre: '',
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGenre(state: FilmFilterState, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    setFilmName(state: FilmFilterState, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCinema(state: FilmFilterState, action: PayloadAction<string>) {
      state.cinema = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const {
  setFilmName, setGenre, setCinema
} = filterSlice.actions;