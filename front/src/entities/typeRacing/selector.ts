import {useAppSelector} from "@/shared/redux/hooks";
import {RootState} from "@/shared/redux/store";
import {HistoryResult, RaceStep, TypingAccuracy} from "@/entities/typeRacing/model";
import {IWord} from "@/entities/typeRacing/slice";

export const useElapsedSeconds = (): number =>
    useAppSelector((state: RootState) => state.typeRacing.elapsed);
export const useCountWords = (): number =>
    useAppSelector((state: RootState) => state.typeRacing.words.length);
export const useCurrentWordIndex = (): number =>
    useAppSelector((state: RootState) => state.typeRacing.wordIdx);

export const useWords = (): IWord[] =>
    useAppSelector((state: RootState) => state.typeRacing.words);

export const useHistoryResult = (): HistoryResult =>
    useAppSelector((state: RootState) => state.typeRacing.historyResult);
export const useRaceTypingAccuracy = (): TypingAccuracy =>
    useAppSelector((state: RootState) => state.typeRacing.accuracy);

export const useWordsCount = (): number =>
    useAppSelector((state: RootState) => state.typeRacing.words.length);

export const useRaceStep = (): RaceStep =>
    useAppSelector((state: RootState) => state.typeRacing.raceStep);