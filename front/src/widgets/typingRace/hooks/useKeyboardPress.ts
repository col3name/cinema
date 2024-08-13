import {useCountWords, useCurrentWordIndex, useRaceStep} from "@/entities/typeRacing/selector";
import {useAppDispatch} from "@/shared/redux/hooks";
import {useCallback} from "react";
import {RaceStep} from "@/entities/typeRacing/model";
import {deleteLastLetter, pressSpaceBar, setRaceStep, typeLetter} from "@/entities/typeRacing/slice";
import {useKeyPress} from "@/shared/hooks";

type UseKeyboardPressProps = {
    startTimer: VoidFunction;
    stopTimer: VoidFunction;
};

export const useKeyboardPress = ({
                                     startTimer,
                                     stopTimer
                                 }: UseKeyboardPressProps) => {
    const raceStep: RaceStep = useRaceStep();
    const dispatch = useAppDispatch();

    const length = useCountWords();

    const currentWordIndex = useCurrentWordIndex();
    const handleKeyPress = useCallback((key: string) => {
        if (raceStep === RaceStep.Initial) {
            dispatch(setRaceStep(RaceStep.Running));
            startTimer();
        }
        if (raceStep === RaceStep.Final) {
            return;
        }

        switch (key) {
            case "Backspace": {
                dispatch(deleteLastLetter());
                break;
            }
            case ' ': {
                dispatch(pressSpaceBar());
                if (currentWordIndex + 1 >= length) {
                    stopTimer();
                }
                break;
            }
            default: {
                dispatch(typeLetter({key}));
                break;
            }
        }
    }, [currentWordIndex, length, dispatch, raceStep, startTimer])
    useKeyPress(handleKeyPress);
}
