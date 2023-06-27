import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cinema: '',
  genre: '',
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setCinema(state, action) {
      state.cinema = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const {
  setName, setGenre, setCinema
} = filterSlice.actions;