
export enum RaceStep {
    Initial = 0,
    FirstPress = 1,
    Running = 2,
    Final = 3,
}

export type TypingAccuracy = {
    correct: number;
    incorrect: number;
    missed: number;
    extra: number;
};

export type ErrorHistoryObject = {
    count: number;
    words: number[];
};

export type HistoryResult = {
    elapsedSeconds: number;
    errors: ErrorHistoryObject[],
    wpmHistory: number[],
    rawHistory: number[],
};

export type NewTypingText = {
    words: string[];
    length: number;
};