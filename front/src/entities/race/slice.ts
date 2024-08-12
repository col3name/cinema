import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type RaceState = {
};

const initialState: RaceState = {
};

const slice = createSlice({
    name: "race",
    initialState: initialState,
    reducers: {

    },
});

export const raceReducer = slice.reducer;

export const {
    // addToCart,
    // decrementQuantity,
    // confirmTheRemoveFromCart,
    // removeFromCart,
    // closeRemoveConfirmPopup,
} = slice.actions;
