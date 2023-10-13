import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type FilterState = {
  cinema: string,
  genre: string,
  name: string
}
const initialState: FilterState = {
  cinema: '',
  genre: '',
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGenre(state: FilterState, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    setName(state: FilterState, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCinema(state: FilterState, action: PayloadAction<string>) {
      state.cinema = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const {
  setName, setGenre, setCinema
} = filterSlice.actions;