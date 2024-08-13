import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorHistoryObject, HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";

export type RaceState = {
    words: string[],
    raceStep: RaceStep;
    accuracy: TypingAccuracy;
    historyResult: HistoryResult;
    tempErrorObject: ErrorHistoryObject;
    letterIdx: number;
    wordIdx: number;
    extraLetters: string[];
    current: string;
};

const initialState: RaceState = {
    words: [],
    wordIdx: 0,
    letterIdx: 0,
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
    current: '',
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
            onSaveHistory: (state: RaceState, action: PayloadAction<onSaveHistoryPayload>) => {
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

            onResetRaceState: (state: RaceState) => {
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
                state.letterIdx = 0;
                state.extraLetters = [];
                state.current = '';
            },
            incrementWordIndex: (state: RaceState) => {
                state.wordIdx++;
            },
            incrementLetterIndex: (state: RaceState) => {
                state.letterIdx++;
            },
            decrementLetterIndex: (state: RaceState) => {
                state.letterIdx--;
            },
            setLetterIndex: (state: RaceState, action: PayloadAction<number>) => {
                state.letterIdx = action.payload;
            },
            incrementAccuracyIncorrect: (state: RaceState) => {
                state.accuracy.incorrect++;
            },
            incrementAccuracyCorrect: (state: RaceState) => {
                state.accuracy.correct++;
            },
            incrementAccuracyMissed: (state: RaceState, action: PayloadAction<number>) => {
                state.accuracy.missed += action.payload;
            },
            incrementAccuracyExtra: (state: RaceState) => {
                state.accuracy.extra++;
            },
            setRaceStep: (state: RaceState, action: PayloadAction<RaceStep>) => {
                state.raceStep = action.payload;
            },
            incrementErrorObject: (state: RaceState, action: PayloadAction<{ count:number }>) => {
                state.tempErrorObject.count += action.payload.count;
                state.tempErrorObject.words.push(state.wordIdx)
            },
            addExtraLetter: (state: RaceState, action: PayloadAction<string>) => {
                state.extraLetters.push(action.payload);
            },
            deleteLastExtraLetter: (state: RaceState) => {
                state.extraLetters = state.extraLetters.splice(0, state.extraLetters.length - 1);
                state.letterIdx--;
                state.current = state.current.substring(0, state.current.length - 1);
            },
            resetExtraLetter: (state: RaceState) => {
                state.extraLetters = [];
            },
            deleteLastLetterInCurrentWord: (state: RaceState) => {
                state.current = state.current.substring(0, state.current.length - 1);
                state.letterIdx--;
            },
            appendLetterInCurrentWord: (state: RaceState, action: PayloadAction<string>) => {
                state.current += action.payload;
            },
            resetCurrentWord: (state: RaceState) => {
                state.current = '';
            },
            setWords: (state: RaceState, action: PayloadAction<string[]>) => {
                state.words = [...action.payload];
            },
            moveToNextWord: (state: RaceState) => {
                state.letterIdx = 0;
                state.extraLetters = [];
                state.current = '';
            },
            typeLetter: (state:RaceState, action: PayloadAction<string>) => {
                const key = action.payload;
                const currentLetterIndex = state.letterIdx;

                const letterIdx: number = currentLetterIndex + 1;
                if (state.extraLetters.length > 8) {
                    slice.caseReducers.incrementErrorObject(state, {...action, payload: {count: 1}});
                    // dispatch(incrementErrorObject({count: 1}));
                    return;
                }
                slice.caseReducers.incrementLetterIndex(state);
                // dispatch(incrementLetterIndex());

                const nextLetterIndex: number = letterIdx + 1;

                const currentWord: string = state.words[state.wordIdx];
                slice.caseReducers.appendLetterInCurrentWord(state, action);
                // dispatch(appendLetterInCurrentWord(key))
                if (nextLetterIndex > currentWord?.length + 1) {
                    slice.caseReducers.incrementErrorObject(state, {...action, payload: {count: 1}});
                    slice.caseReducers.incrementAccuracyExtra(state);
                    slice.caseReducers.addExtraLetter(state, action);

                    // dispatch(incrementErrorObject({count: 1}));
                    // dispatch(incrementAccuracyExtra())
                    // dispatch(addExtraLetter(key));
                    return;
                }
                const currentLetter: string = currentWord?.[letterIdx - 1];
                if (state.current.length > currentWord.length) {
                    slice.caseReducers.addExtraLetter(state, action);
                    // dispatch(addExtraLetter(key));
                }

                const isSame = currentLetter === key;
                if (!isSame) {
                    slice.caseReducers.incrementErrorObject(state, {...action, payload: {count: 1}});
                    slice.caseReducers.incrementAccuracyIncorrect(state);
                    // dispatch(incrementErrorObject({count: 1}));
                    // dispatch(incrementAccuracyIncorrect());
                } else {
                    slice.caseReducers.incrementAccuracyCorrect(state);
                    // dispatch(incrementAccuracyCorrect());
                }
            }
        },
    });


export const raceReducer = slice.reducer;

export const {
    setWords,
    onResetRaceState,
    onSaveHistory,
    incrementAccuracyIncorrect,
    incrementAccuracyCorrect,
    incrementAccuracyMissed,
    incrementAccuracyExtra,
    setRaceStep,
    incrementErrorObject,
    addExtraLetter,
    deleteLastExtraLetter,
    resetExtraLetter,
    appendLetterInCurrentWord,
    deleteLastLetterInCurrentWord,
    resetCurrentWord,
    moveToNextWord,
    incrementWordIndex,
    incrementLetterIndex,
    decrementLetterIndex,
    setLetterIndex,
    typeLetter,
    // addToCart,
    // decrementQuantity,
    // confirmTheRemoveFromCart,
    // removeFromCart,
    // closeRemoveConfirmPopup,
} = slice.actions;
