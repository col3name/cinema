import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorHistoryObject, HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";
import {WritableDraft} from "immer/src/types/types-external";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";

export type RaceState = {
    words: string[],
    raceStep: RaceStep;
    accuracy: TypingAccuracy;
    historyResult: HistoryResult;
};

const initialState: RaceState = {
    words: [],
    raceStep: RaceStep.Initial,
    accuracy: {
        correct: 0,
        incorrect: 0,
        missed: 0,
    },
    historyResult: {
        elapsedSeconds: 0,
        errors: [],
        wpmHistory: [],
        rawHistory: [],
    },
};


type onSaveHistoryPayload = {
    errorHistoryObject: ErrorHistoryObject;
    elapsedSeconds: number;
    // accuracy: TypingAccuracy;
}
export type OnPressSpacePayload = {
    elapsed: number;
    clearWords: VoidFunction;
}

const slice = createSlice({
        name: "race",
        initialState: initialState,
        reducers: {
            onSaveHistory: (state: WritableDraft<RaceState>, action: PayloadAction<onSaveHistoryPayload>) => {
                const elapsedSeconds = action.payload.elapsedSeconds;
                state.historyResult.elapsedSeconds = elapsedSeconds;
                const {wpm, raw} = calculateWpmAndRaw(elapsedSeconds, state.accuracy);
                state.historyResult.wpmHistory.push(wpm);
                state.historyResult.rawHistory.push(raw);

                const errorHistoryObject = action.payload.errorHistoryObject;
                state.historyResult.errors.push({
                    count: errorHistoryObject.count,
                    words: Array.from(new Set(errorHistoryObject.words).values())
                });
            },

            onResetRaceState: (state: WritableDraft<RaceState>) => {
                state.words = [];
                state.raceStep = RaceStep.Initial;
                state.accuracy = {
                    correct: 0,
                    incorrect: 0,
                    missed: 0,
                };
                state.historyResult = {
                    elapsedSeconds: 0,
                    errors: [],
                    wpmHistory: [],
                    rawHistory: [],
                }
            },
            incrementAccuracyIncorrect: (state: WritableDraft<RaceState>) => {
                state.accuracy.incorrect++;
            },
            incrementAccuracyCorrect: (state: WritableDraft<RaceState>) => {
                state.accuracy.correct++;
            },
            incrementAccuracyMissed: (state: WritableDraft<RaceState>) => {
                state.accuracy.missed++;
            },
            setRaceStep: (state: WritableDraft<RaceState>, action: PayloadAction<RaceStep>) => {
                state.raceStep = action.payload;
            },
        },
    })
;

export const raceReducer = slice.reducer;

export const {
    onResetRaceState,
    onSaveHistory,
    incrementAccuracyIncorrect,
    incrementAccuracyCorrect,
    incrementAccuracyMissed,
    setRaceStep,
    // addToCart,
    // decrementQuantity,
    // confirmTheRemoveFromCart,
    // removeFromCart,
    // closeRemoveConfirmPopup,
} = slice.actions;
