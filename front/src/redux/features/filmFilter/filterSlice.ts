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
      const newValue = action.payload;
      if (state.genre === newValue) {
        return
      }
      state.genre = newValue;
    },
    setFilmName(state: FilmFilterState, action: PayloadAction<string>) {
      const newValue = action.payload;
      if (state.name === newValue) {
        return
      }
      state.name = newValue;
    },
    setCinema(state: FilmFilterState, action: PayloadAction<string>) {
      const newValue = action.payload;
      if (state.cinema === newValue) {
        return
      }
      state.cinema = newValue;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const {
  setFilmName, setGenre, setCinema
} = filterSlice.actions;