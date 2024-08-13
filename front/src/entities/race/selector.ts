import {useAppSelector} from "@/shared/redux/hooks";
import {RootState} from "@/shared/redux/store";
import {HistoryResult, RaceStep, TypingAccuracy} from "@/entities/race/model";

// export const useLetterIdx = (): number =>
//     useAppSelector((state: RootState) => state.race.letterIdx);
// export const useCurrentWordIdx = (): number =>
//     useAppSelector((state: RootState) => state.race.wordIdx);
// export const useExtraLetters = (): string[] =>
//     useAppSelector((state: RootState) => state.race.extraLetters);

export const useRaceWords = (): string[] =>
    useAppSelector((state: RootState) => state.race.words);

export const useTypedWord = (): string =>
    useAppSelector((state: RootState) => state.race.current);

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

export const useCountWords = (): number =>
    useAppSelector((state: RootState) => state.race.words.length);

// export const useLastLetterInWord = (): string|undefined =>
//     useAppSelector((state: RootState) => {
//         const word = state.race.words[state.race.wordIdx];
//         const letter = word?.[state.race.letterIdx - 1];
//         return letter
//     })
//

export const useRaceStep = (): RaceStep =>
    useAppSelector((state: RootState) => state.race.raceStep);