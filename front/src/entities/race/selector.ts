import {useAppSelector} from "@/shared/redux/hooks";
import {RootState} from "@/shared/redux/store";
import {HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";

export const useCurrentLetterIndex = (): number =>
    useAppSelector((state: RootState) => state.race.letterIdx);

export const useExtraLetters = (): string[] =>
    useAppSelector((state: RootState) => state.race.extraLetters);

export const useCurrentWordIndex = (): number =>
    useAppSelector((state: RootState) => state.race.wordIdx);

export const useHistoryResult = (): HistoryResult =>
    useAppSelector((state: RootState) => state.race.historyResult);
export const useRaceTypingAccuracy = (): TypingAccuracy =>
    useAppSelector((state: RootState) => state.race.accuracy);

export const useWordsCount = (): number =>
    useAppSelector((state: RootState) => state.race.words.length);

export const useRaceStep = (): RaceStep =>
    useAppSelector((state: RootState) => state.race.raceStep);