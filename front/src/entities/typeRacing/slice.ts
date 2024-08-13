import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorHistoryObject, HistoryResult, RaceStep, TypingAccuracy} from "@/entities/typeRacing/model";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";

export type RaceState = {
    wordIdx: number;
    letterIdx: number;
    length: number;
    elapsed: number;
    words: IWord[],
    raceStep: RaceStep;
    accuracy: TypingAccuracy;
    historyResult: HistoryResult;
    tempErrorObject: ErrorHistoryObject;
    typedWord: string;
};

export enum ILetterType {
    Initial = 'Initial',
    Incorrect = 'Incorrect',
    Correct = 'Correct',
    Current = 'Current',
    Extra = 'Extra',
}

export type ILetter = {
    id: number;
    text: string;
    type: ILetterType;
};

export type IWord = {
    id: number;
    text: string;
    isActive: boolean;
    letters: ILetter[];
    extraLetters: string[];
}

const initialState: RaceState = {
    elapsed: 0,
    wordIdx: 0,
    length: 0,
    words: [],
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
    typedWord: '',
};

type TypeLetterPayloadAction = { key: string };

type SetWordsPayload = {
    words: string[];
    length: number;
};

const typeRacingSlice = createSlice({
    name: "typeRacing",
    initialState: initialState,
    reducers: {
        setElapsedSeconds: (state: RaceState, action: PayloadAction<number>) => {
            state.elapsed = action.payload;
        },
        saveHistory: (state: RaceState) => {
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
        restartRacing: (state: RaceState) => {
            state.elapsed = 0;
            state.wordIdx = 0;
            state.letterIdx = 0;
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
            }
            state.typedWord = '';
        },
        setWords: (state: RaceState, action: PayloadAction<SetWordsPayload>) => {
            state.length = action.payload.length;
            state.words = action.payload.words.map((word, wordIndex) => ({
                id: wordIndex,
                text: word,
                isActive: wordIndex === 0,
                letters: word.split('').map((letter, letterIndex) => ({
                    id: letterIndex,
                    text: letter,
                    type: wordIndex === 0 && letterIndex === 0 ? ILetterType.Current : ILetterType.Initial,
                })),
                extraLetters: [],
            }));
        },
        deleteLastLetter: (state: RaceState) => {
            if (state.letterIdx === 0) {
                return;
            }
            const extraLetters: string[] = state.words[state.wordIdx].extraLetters;
            if (extraLetters.length > 0) {
                state.letterIdx--;
                state.typedWord = state.typedWord.substring(0, state.typedWord.length - 1);
                state.words[state.wordIdx].extraLetters = extraLetters.slice(0, extraLetters.length - 1);
                if (state.words[state.wordIdx].letters[state.letterIdx]) {
                    state.words[state.wordIdx].letters[state.letterIdx].type = ILetterType.Current;
                }
                return;
            }
            if (state.letterIdx > 0) {
                if (state.words[state.wordIdx].letters[state.letterIdx]) {
                    state.words[state.wordIdx].letters[state.letterIdx].type = ILetterType.Initial;
                }
                state.letterIdx--;
                state.typedWord = state.typedWord.substring(0, state.typedWord.length - 1);
                state.words[state.wordIdx].letters[state.letterIdx].type = ILetterType.Current;
            }
        },
        pressSpaceBar: (state: RaceState) => {
            if (state.words.length === 0) {
                return;
            }
            if (state.typedWord.length === 0) {
                return;
            }
            if (state.wordIdx >= state.words.length) {
                return;
            }
            state.typedWord = '';
            const currentWord = state.words[state.wordIdx];
            if (state.letterIdx < currentWord.text.length) {
                const count = currentWord.text.length - state.letterIdx;
                state.accuracy.missed += count;
                typeRacingSlice.caseReducers.incrementErrorObject(state, {type: 'incrementErrorObject', payload: {count}});
            }

            state.words[state.wordIdx].isActive = false;
            state.words[state.wordIdx].extraLetters = [];
            if (state.words[state.wordIdx].letters[state.letterIdx]) {
                state.words[state.wordIdx].letters[state.letterIdx].type = ILetterType.Initial;
            }
            state.wordIdx++;
            state.letterIdx = 0;
            if (!state.words[state.wordIdx]) {
                state.raceStep = RaceStep.Final;
                return;
            }
            state.words[state.wordIdx].isActive = true;
            state.words[state.wordIdx].letters[0].type = ILetterType.Current;
        },
        typeLetter: (state: RaceState, action: PayloadAction<TypeLetterPayloadAction>) => {
            const currentWord: IWord = state.words[state.wordIdx];
            if (!currentWord) {
                return;
            }
            const key = action.payload.key;
            state.typedWord += key

            const isExtra = state.typedWord.length > currentWord.letters.length;
            if (isExtra) {
                state.accuracy.extra++;
                state.letterIdx++;
                typeRacingSlice.caseReducers.incrementErrorObject(state, {type: action.type, payload: {count: 1}});
                state.words[state.wordIdx].extraLetters.push(key);
                return;
            }
            const iLetters = state.words[state.wordIdx].letters;
            const currentLetter = currentWord.text[state.letterIdx];
            if (key !== currentLetter) {
                typeRacingSlice.caseReducers.incrementErrorObject(state, {type: action.type, payload: {count: 1}});
                state.accuracy.incorrect++;
                iLetters[state.letterIdx].type = ILetterType.Incorrect;
            } else {
                state.accuracy.correct++;
                iLetters[state.letterIdx].type = ILetterType.Correct;
            }

            state.letterIdx++;
            if (!isExtra) {
                if (state.letterIdx >= iLetters.length) {
                    return;
                }
                iLetters[state.letterIdx].type = ILetterType.Current;
            }
        },
        setRaceStep: (state: RaceState, action: PayloadAction<RaceStep>) => {
            state.raceStep = action.payload;
        },
        incrementErrorObject: (state: RaceState, action: PayloadAction<{ count: number }>) => {
            state.tempErrorObject.count += action.payload.count;
            state.tempErrorObject.words.push(state.wordIdx)
        },
    },
});


export const typeRacingReducer = typeRacingSlice.reducer;

export const {
    setRaceStep,
    saveHistory,
    setElapsedSeconds,
    restartRacing,
    deleteLastLetter,
    setWords,
    pressSpaceBar,
    typeLetter,
} = typeRacingSlice.actions;
