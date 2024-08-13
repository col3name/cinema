import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorHistoryObject, HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";

export type RaceState = {
    wordIdx: number;
    elapsed: number;
    words: string[],
    raceStep: RaceStep;
    accuracy: TypingAccuracy;
    historyResult: HistoryResult;
    letterIdx: number;
    tempErrorObject: ErrorHistoryObject;
    extraLetters: string[];
    current: string;
};

const initialState: RaceState = {
    elapsed: 0,
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

const slice = createSlice({
        name: "race",
        initialState: initialState,
        reducers: {
            setElapsedSeconds: (state: RaceState, action: PayloadAction<number>) => {
                state.elapsed = action.payload;
            },
            onSaveHistory: (state: RaceState) => {
                const elapsedSeconds = state.elapsed;
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
                // state.words = [];
                state.elapsed = 0;
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
            setRaceStep: (state: RaceState, action: PayloadAction<RaceStep>) => {
                state.raceStep = action.payload;
            },
            incrementErrorObject: (state: RaceState, action: PayloadAction<{ count:number }>) => {
                state.tempErrorObject.count += action.payload.count;
                state.tempErrorObject.words.push(state.wordIdx)
            },
            deleteLastTypedLetter: (state: RaceState) => {
                if (state.extraLetters.length > 0) {
                    slice.caseReducers.deleteLastExtraLetter(state);
                    return;
                }
                if (state.current.length > 0) {
                    slice.caseReducers.deleteLastLetterInCurrentWord(state);
                    return;
                }
            },
            deleteLastExtraLetter: (state: RaceState) => {
                state.extraLetters = state.extraLetters.splice(0, state.extraLetters.length - 1);
                state.letterIdx--;
                state.current = state.current.substring(0, state.current.length - 1);
            },
            deleteLastLetterInCurrentWord: (state: RaceState) => {
                state.current = state.current.substring(0, state.current.length - 1);
                state.letterIdx--;
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
                    slice.caseReducers.incrementErrorObject(state, {type: action.type, payload: {count: 1}});
                    return;
                }
                state.letterIdx++;

                const nextLetterIndex: number = letterIdx + 1;

                const currentWord: string = state.words[state.wordIdx];
                state.current += key;
                if (nextLetterIndex > currentWord?.length + 1) {
                    slice.caseReducers.incrementErrorObject(state, {type: action.type, payload: {count: 1}});
                    state.accuracy.extra++;
                    state.extraLetters.push(action.payload);
                    return;
                }
                const currentLetter: string = currentWord?.[letterIdx - 1];
                if (state.current.length > currentWord.length) {
                    state.extraLetters.push(action.payload);
                }

                const isSame = currentLetter === key;
                if (!isSame) {
                    slice.caseReducers.incrementErrorObject(state, {type: action.type, payload: {count: 1}});
                    state.accuracy.incorrect++;
                } else {
                    state.accuracy.correct++;
                }
            },
            pressSpaceBar: (state: RaceState) => {
                if (state.letterIdx === 0) {
                    return;
                }
                const currentWord = state.words[state.wordIdx];
                if (state.letterIdx < currentWord.length) {
                    const count = currentWord.length - state.letterIdx;
                    state.accuracy.missed += count;
                    slice.caseReducers.incrementErrorObject(state, {type: 'incrementErrorObject', payload: {count}});
                }
                state.accuracy.correct++;
                state.wordIdx++;

                if (state.wordIdx + 1 <= state.words.length) {
                    slice.caseReducers.moveToNextWord(state);
                } else {
                    slice.caseReducers.onSaveHistory(state);
                    state.raceStep = RaceStep.Final;
                }
            }
        },
    });


export const raceReducer = slice.reducer;

export const {
    setElapsedSeconds,
    setWords,
    onResetRaceState,
    onSaveHistory,
    setRaceStep,
    deleteLastTypedLetter,
    pressSpaceBar,
    typeLetter,
} = slice.actions;
