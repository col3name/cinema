import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorHistoryObject, HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";
import {WritableDraft} from "immer/src/types/types-external";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";

export type RaceState = {
    words: string[],
    raceStep: RaceStep;
    accuracy: TypingAccuracy;
    historyResult: HistoryResult;
    tempErrorObject: ErrorHistoryObject;
    wordIdx: number;
    extraLetters: string[];
};

const initialState: RaceState = {
    words: [],
    wordIdx: 0,
    raceStep: RaceStep.Initial,
    accuracy: {
        extra: 0,
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
    tempErrorObject: {
        count: 0,
        words: [],
    },
    extraLetters: [],
};


type onSaveHistoryPayload = {
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

                const errorHistoryObject = state.tempErrorObject;
                state.historyResult.errors.push({
                    count: errorHistoryObject.count,
                    words: Array.from(new Set(errorHistoryObject.words).values())
                });
                state.tempErrorObject.count = 0;
                state.tempErrorObject.words = [];
            },

            onResetRaceState: (state: WritableDraft<RaceState>) => {
                state.words = [];
                state.raceStep = RaceStep.Initial;
                state.accuracy = {
                    extra: 0,
                    correct: 0,
                    incorrect: 0,
                    missed: 0,
                };
                state.historyResult = {
                    elapsedSeconds: 0,
                    errors: [],
                    wpmHistory: [],
                    rawHistory: [],
                };
                state.tempErrorObject = {
                    count: 0,
                    words: [],
                };
                state.wordIdx = 0;
                state.extraLetters = [];
            },
            incrementAccuracyIncorrect: (state: WritableDraft<RaceState>) => {
                state.accuracy.incorrect++;
            },
            incrementAccuracyCorrect: (state: WritableDraft<RaceState>) => {
                state.accuracy.correct++;
            },
            incrementAccuracyMissed: (state: WritableDraft<RaceState>, action: PayloadAction<number>) => {
                state.accuracy.missed += action.payload;
            },
            incrementAccuracyExtra: (state: WritableDraft<RaceState>) => {
                state.accuracy.extra++;
            },
            setRaceStep: (state: WritableDraft<RaceState>, action: PayloadAction<RaceStep>) => {
                state.raceStep = action.payload;
            },
            incrementErrorObject: (state: WritableDraft<RaceState>, action: PayloadAction<{ count:number, wordIdx: number }>) => {
                state.tempErrorObject.count += action.payload.count;
                state.tempErrorObject.words.push(action.payload.wordIdx)
            },
            addExtraLetter: (state: WritableDraft<RaceState>, action: PayloadAction<string>) => {

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
    incrementAccuracyExtra,
    setRaceStep,
    incrementErrorObject,
    // addToCart,
    // decrementQuantity,
    // confirmTheRemoveFromCart,
    // removeFromCart,
    // closeRemoveConfirmPopup,
} = slice.actions;
