
export enum RaceStep {
    Initial = 0,
    FirstPress = 1,
    Running = 2,
    Final = 3,
}

export type Accuracy = {
    correct: number;
    incorrect: number;
    missed: number;
};

export type ErrorHistoryObject = {
    count: number;
    words: number[];
};

export type HistoryResult = {
    errors: ErrorHistoryObject[],
    wpmHistory: number[],
    rawHistory: number[],
};

export type InputData = {
    current: string;
    historyLength: number;
    wordIdx: number;
    length: number;
    letterIdx: number;
    activeWordIdx: number;
    isTyping: boolean;
    extraLetters: string[];
    accuracy: Accuracy;
    history: string[];
    historyResult: HistoryResult;
};

export type NewTypingText = {
    words: string[];
    length: number;
};